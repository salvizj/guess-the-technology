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
      <div className="flex flex-wrap">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </>
  )
}
