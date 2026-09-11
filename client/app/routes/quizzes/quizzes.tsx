import { useEffect, useState } from "react"
import type { Route } from "./+types/quizzes"
import type { Quiz } from "../../types/types"
import { QuizCard } from "../../features/quizzes/components/QuizCard"
import { useQuiz } from "../../features/quizzes/hooks/useQuiz"
import { useQuery } from "../../hooks/useQuery"
import { Input } from "../../components/base/Input"
import { QUIZ_CATEGORIES } from "../../constants/constants"
import { Select } from "../../components/base/Select"
import { Button } from "../../components/base/Button"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function Quizzes() {
  const { getQuizzes } = useQuiz()
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const queryKeys = ["title", "description", "category", "questionCount"]
  const [values, setValue, deleteValues] = useQuery(queryKeys)

  useEffect(() => {
    getQuizzes()
      .then((data) => setQuizzes(data))
      .catch(() => {})
  }, [])

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-row gap-4">
          <Input
            type={"title"}
            placeholder={"title"}
            value={values["title"]}
            onChange={(e) => setValue("title", e.target.value)}
          />
          <Input
            type={"description"}
            placeholder={"description"}
            value={values["description"]}
            onChange={(e) => setValue("description", e.target.value)}
          />
          <Select
            placeholder={"category"}
            onChange={(e) => setValue("category", e.target.value)}
            options={QUIZ_CATEGORIES}
            value={values["category"]}
          />
          <Input
            type={"number"}
            placeholder={"question count"}
            value={values["questionCountj"]}
            onChange={(e) => setValue("questionCount", e.target.value)}
          />
          <Button onClick={deleteValues}>Clear filters</Button>
        </div>
        <div className="flex flex-wrap gap-4">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </div>
    </>
  )
}
