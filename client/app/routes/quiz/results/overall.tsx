import { useNavigate, useParams, useSearchParams } from "react-router"
import type { Route } from "./+types/overall"
import { useEffect, useState } from "react"
import type { Quiz, Score } from "../../../types/types"
import { useQuiz } from "../../../features/quizzes/hooks/useQuiz"
import { OverallResults } from "../../../features/quizzes/components/OverallResults"
import { useQuizNavigation } from "../../../features/quizzes/hooks/useQuizNavigation"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function ResultsOverall() {
  const { isLoading, error, getScoreByScoreId, getQuiz } = useQuiz()
  const { id } = useParams()
  const [score, setScore] = useState<Score | null>(null)
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const { handleRedirectToResultQuestions } = useQuizNavigation()
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
  return (
    <OverallResults
      score={score}
      quiz={quiz}
      onReviewQuestions={handleRedirectToResultQuestions}
    />
  )
}
