import { useEffect, useState } from "react"
import type { Route } from "./+types/play"
import { PlayQuestion } from "../../features/quizzes/components/PlayQuestion"
import useQuiz from "../../features/quizzes/hooks/useQuiz"
import type { Quiz } from "../../types/types"
import { useNavigate, useParams } from "react-router"
import { useAuthContext } from "../../context/useAuthContext"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function Play() {
  const [currQArrIndex, setCurrQArrIndex] = useState(0)
  const { userId } = useAuthContext()
  const { getQuiz, isLoading, error, createScore } = useQuiz()
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedAnswerIds, setSelectedAnswerIds] = useState<
    Record<string, string[]>
  >({}) //questionId, answerId

  useEffect(() => {
    getQuiz(id as string)
      .then((data) => setQuiz(data))
      .catch(() => {})
  }, [getQuiz])

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
      setCurrQArrIndex(currQArrIndex + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currQArrIndex > 0) {
      setCurrQArrIndex(currQArrIndex - 1)
    }
  }

  const handleAnswer = (questionId: string, answerId: string) => {
    //remove answer if already selected, otherwise add it to the selected answers
    if (selectedAnswerIds[questionId]?.includes(answerId)) {
      setSelectedAnswerIds((prevAnswers) => ({
        ...prevAnswers,
        [questionId]: prevAnswers[questionId]?.filter((id) => id !== answerId),
      }))
    } else {
      setSelectedAnswerIds((prevAnswers) => ({
        ...prevAnswers,
        [questionId]: [...(prevAnswers[questionId] || []), answerId],
      }))
    }
  }
  const handleSubmit = async () => {
    try {
      const scoreData = {
        userId: userId as number,
        quizId: quiz.id,
        score: calculateScore(),
      }

      const res = await createScore(scoreData, String(quiz.id))

      if (res?.score?.id) {
        navigate(`/results/${res.score.id}`)
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
      <PlayQuestion
        question={quiz.questions[currQArrIndex]}
        onAnswer={handleAnswer}
        selectedAnswerIds={selectedAnswerIds}
        onNextQuestion={handleNextQuestion}
        onPreviousQuestion={handlePreviousQuestion}
        onSubmit={handleSubmit}
        isLastQuestion={currQArrIndex === quiz.questions.length - 1}
        isFirstQuestion={currQArrIndex === 0}
        questionIndex={currQArrIndex}
      />
    </>
  )
}
