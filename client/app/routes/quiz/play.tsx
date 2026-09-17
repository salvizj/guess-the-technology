import { useEffect, useState } from "react"
import type { Route } from "./+types/play"
import { QuizQuestionCard } from "../../context/quizzes/components/QuizQuestionCard"
import { QuizType, type Quiz } from "../../types/types"
import { useNavigate, useParams, useSearchParams } from "react-router"
import { useAuthContext } from "../../context/useAuthContext"
import { useQuiz } from "../../context/quizzes/hooks/useQuiz"
import { TimerDisplay } from "../../components/TimerDisplay"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function Play() {
  const { userId } = useAuthContext()
  const { getQuiz, isLoading, error, createScore } = useQuiz()
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedAnswerIds, setSelectedAnswerIds] = useState<
    Record<string, string[]>
  >({}) //questionId, answerId
  const [searchParams, setSearchParams] = useSearchParams()
  const paramQ = parseInt(searchParams.get("q") || "", 10)
  const currQArrIndex = isNaN(paramQ) || paramQ < 1 ? 0 : paramQ - 1
  const [timeRanOut, setTimeRanOut] = useState(false)

  useEffect(() => {
    if (!id) return
    getQuiz(id as string)
      .then((data) => setQuiz(data))
      .catch(() => {})
  }, [id])

  useEffect(() => {
    if (!searchParams.has("q")) {
      setSearchParams({ q: "1" }, { replace: true })
    }
  }, [searchParams, setSearchParams])

  useEffect(() => {
    if (!quiz) return

    const rawQ = searchParams.get("q")
    const parsedQ = parseInt(rawQ || "", 10)
    const totalQuestions = quiz.questions.length

    const isInvalid =
      !rawQ || isNaN(parsedQ) || parsedQ < 1 || parsedQ > totalQuestions

    if (isInvalid) {
      setSearchParams({ q: "1" }, { replace: true })
    }
  }, [quiz, searchParams, setSearchParams])

  useEffect(() => {
    if (!quiz || quiz.type != QuizType.TIMED) return

    if (timeRanOut) handleSubmit()
  }, [timeRanOut, quiz])

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>Error: {error}</p>
  }

  if (!quiz) {
    return <p>Quiz not found.</p>
  }

  const handleNextQuestion = () => {
    if (quiz.questions.length - 1 > currQArrIndex) {
      setSearchParams({ q: String(currQArrIndex + 2) })
    }
  }

  const handlePreviousQuestion = () => {
    if (currQArrIndex > 0) {
      setSearchParams({ q: String(currQArrIndex) })
    }
  }

  const handleAnswer = (questionId: string, answerId: string) => {
    setSelectedAnswerIds((prevAnswers) => {
      const currentAnswers = prevAnswers[questionId] || []
      const exists = currentAnswers.includes(answerId)

      const updatedAnswers = exists
        ? currentAnswers.filter((id) => id !== answerId)
        : [...currentAnswers, answerId]

      return {
        ...prevAnswers,
        [questionId]: updatedAnswers,
      }
    })
  }
  const handleSubmit = async () => {
    try {
      const scoreData = {
        userId: userId as number,
        quizId: quiz.id,
        score: calculateScore(),
        userAnswers: selectedAnswerIds,
      }

      console.log(scoreData)

      const res = await createScore(scoreData, String(quiz.id))

      if (res?.score?.id) {
        navigate(`/results/${res.score.id}/questions/?q=1`)
      }
    } catch (error) {
      console.error("Failed to submit score:", error)
    }
  }

  const calculateScore = (): number => {
    return quiz.questions.reduce((totalScore, question) => {
      const correctAnswerCount = question.answers.filter(
        (a) => a.correct,
      ).length

      const pointsPerOption = 1 / correctAnswerCount

      const questionScore = question.answers.reduce((qAcc, answer) => {
        if (
          selectedAnswerIds[String(question.id)]?.includes(String(answer.id))
        ) {
          return answer.correct
            ? qAcc + pointsPerOption
            : qAcc - pointsPerOption
        }
        return qAcc
      }, 0)

      const finalQuestionScore = Math.max(0, questionScore)

      return totalScore + finalQuestionScore
    }, 0)
  }
  return (
    <>
      {quiz.type === QuizType.TIMED && (
        <TimerDisplay
          timeLeftInSeconds={quiz.timeLimit}
          onTimeRanOut={() => setTimeRanOut(true)}
        />
      )}
      <QuizQuestionCard
        question={quiz.questions[currQArrIndex]}
        onAnswer={handleAnswer}
        selectedAnswers={selectedAnswerIds[quiz.questions[currQArrIndex].id]}
        onNextQuestion={handleNextQuestion}
        onPreviousQuestion={handlePreviousQuestion}
        onSubmit={handleSubmit}
        isLastQuestion={currQArrIndex === quiz.questions.length - 1}
        isFirstQuestion={currQArrIndex === 0}
        questionIndex={currQArrIndex}
        mode={"quiz"}
      />
    </>
  )
}
