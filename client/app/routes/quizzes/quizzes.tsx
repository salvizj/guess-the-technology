import { useEffect, useState } from "react"
import type { Route } from "./+types/quizzes"
import type { Quiz } from "../../types/types"
import { QuizCard } from "../../features/quizzes/components/QuizCard"
import { useQuiz } from "../../features/quizzes/hooks/useQuiz"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function Quizzes() {
  const { getQuizzes } = useQuiz()
  const [quizzes, setQuizzes] = useState<Quiz[]>([])

  useEffect(() => {
    getQuizzes()
      .then((data) => setQuizzes(data))
      .catch(() => {})
  }, [])

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </>
  )
}
