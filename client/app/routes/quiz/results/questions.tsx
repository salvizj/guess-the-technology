import { Navigate, useNavigate, useParams, useSearchParams } from "react-router"
import type { Route } from "./+types/questions"
import { useEffect, useState } from "react"
import type { Quiz, Score } from "../../../types/types"
import { QuizQuestionCard } from "../../../context/quizzes/components/QuizQuestionCard"
import { useQuiz } from "../../../context/quizzes/hooks/useQuiz"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function ResultsQuestions() {
  const { isLoading, error, getScoreByScoreId, getQuiz } = useQuiz()
  const { id } = useParams()
  const [score, setScore] = useState<Score | null>(null)
  const [quiz, setQuiz] = useState<Quiz | null>(null)

  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const paramQ = parseInt(searchParams.get("q") || "1", 10)
  const currQArrIndex = isNaN(paramQ) || paramQ < 1 ? 0 : paramQ - 1

  useEffect(() => {
    if (!id) return
    getScoreByScoreId(id as string)
      .then((data) => setScore(data))
      .catch(() => {})
  }, [id])

  useEffect(() => {
    if (!score?.quizId) return
    getQuiz(String(score.quizId))
      .then((data) => setQuiz(data))
      .catch(() => {})
  }, [score?.quizId])

  useEffect(() => {
    if (!searchParams.has("q")) {
      setSearchParams({ q: "1" }, { replace: true })
    }
  }, [searchParams, setSearchParams])

  useEffect(() => {
    if (!quiz || !score) return

    const rawQ = searchParams.get("q")
    const parsedQ = parseInt(rawQ || "", 10)
    const totalQuestions = quiz.questions.length

    const isInvalid =
      !rawQ || isNaN(parsedQ) || parsedQ < 1 || parsedQ > totalQuestions

    if (isInvalid) {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          next.delete("q")
          return next
        },
        { replace: true },
      )
    }
  }, [quiz, searchParams, setSearchParams, score])

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>Error: {error}</p>
  }

  if (!score) {
    return <p>Score not found.</p>
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

  const handleToOverall = () => {
    navigate(`/results/${id}`)
  }

  return (
    <div className="py-12 w-full">
      <QuizQuestionCard
        question={quiz.questions[currQArrIndex]}
        selectedAnswers={score.userAnswers[quiz.questions[currQArrIndex].id]}
        onNextQuestion={handleNextQuestion}
        onPreviousQuestion={handlePreviousQuestion}
        isLastQuestion={currQArrIndex === quiz.questions.length - 1}
        isFirstQuestion={currQArrIndex === 0}
        questionIndex={currQArrIndex}
        mode={"result"}
        onToOverall={handleToOverall}
      />
    </div>
  )
}
