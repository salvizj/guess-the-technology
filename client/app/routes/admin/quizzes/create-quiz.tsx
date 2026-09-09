import { useNavigate } from "react-router"
import type { QuizSchema } from "../../../schemas/quizSchema"
import type { Route } from "./+types/create-quiz"
import { useQuiz } from "../../../features/quizzes/hooks/useQuiz"
import { CreateQuizForm } from "../../../features/quizzes/components/CreateQuizForm"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function CreateQuiz() {
  const { createQuiz, error } = useQuiz()
  const navigate = useNavigate()
  const onSubmit = async (formData: QuizSchema) => {
    try {
      const response = await createQuiz(formData)

      if (response?.quiz?.id) {
        navigate("/admin/quizzes")
      }
    } catch (error) {
      console.error("Failes to create a quiz", error)
    }
  }
  return (
    <>
      <CreateQuizForm onSubmit={onSubmit} />
      {error && <p className="error">{error}</p>}
    </>
  )
}
