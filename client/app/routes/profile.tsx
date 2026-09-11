import { useEffect, useState } from "react"
import { useAuthContext } from "../context/useAuthContext"
import { useQuiz } from "../features/quizzes/hooks/useQuiz"
import type { Route } from "./+types/profile"
import type { Score } from "../types/types"
import { useNavigate } from "react-router"
import { ProfileResultsQuizCard } from "../features/quizzes/components/ProfileResultsQuizCard"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function Profile() {
  const { getScoresByUserId, getQuiz, isLoading, error } = useQuiz()
  const { userId } = useAuthContext()
  const [scores, setScores] = useState<Score[]>([])

  const navigate = useNavigate()
  useEffect(() => {
    if (!userId) return

    getScoresByUserId(String(userId))
      .then((data) => setScores(data))
      .catch(() => {})
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>Error: {error}</p>
  }

  if (!scores) {
    return <p>Score not found.</p>
  }

  return (
    <div className="flex flex-col gap-6 p-6 sm:p-10">
      <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
        Recently completed quizzes
      </h1>
      <div className="flex flex-wrap gap-4">
        {scores.map((score) => (
          <ProfileResultsQuizCard key={score.createdAt} score={score} />
        ))}
      </div>
    </div>
  )
}
