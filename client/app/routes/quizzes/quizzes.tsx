import { useEffect, useState } from "react"
import type { Route } from "./+types/quizzes"
import { QuizType, type Quiz } from "../../types/types"
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
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([])
  const queryKeys = [
    "title",
    "description",
    "category",
    "questionCount",
    "type",
    "timeLimit",
  ]
  const [values, setValue, deleteValues] = useQuery(queryKeys)
  const [areFiltersApplied, setAreFiltersApplied] = useState(false)

  useEffect(() => {
    getQuizzes()
      .then((data) => setQuizzes(data))
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!areFiltersApplied) {
      setFilteredQuizzes(quizzes)
      return
    }
    setFilteredQuizzes(
      quizzes.filter((quiz) => {
        return queryKeys.every((key) => {
          let queryValue = values[key]

          if (queryValue == null || queryValue === "") {
            return true
          }
          {
            let propertyValue: unknown

            if (key === "questionCount") {
              propertyValue = quiz.questions.length
            } else {
              propertyValue = quiz[key as keyof Quiz]
            }

            if (propertyValue === null) {
              return false
            }

            return String(propertyValue)
              .toLowerCase()
              .includes(String(queryValue).toLocaleLowerCase())
          }
        })
      }),
    )
  }, [values, quizzes])

  if (quizzes.length === 0) {
    return <p>No quizzes available yet.</p>
  }

  const handleApplyingFilters = () => {
    setAreFiltersApplied(true)
  }

  const handleClearFilters = () => {
    deleteValues()
    setAreFiltersApplied(false)
  }

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
          <Select
            placeholder={"type"}
            onChange={(e) => setValue("type", e.target.value)}
            options={Object.values(QuizType)}
            value={values["type"]}
          />
          {values["type"] === QuizType.TIMED && (
            <Input
              type={"number"}
              placeholder={"time limit "}
              value={values["timeLimit"]}
              onChange={(e) => setValue("timeLimit", e.target.value)}
            />
          )}
          <Button onClick={handleClearFilters}>Clear filters</Button>
          <Button onClick={handleApplyingFilters}>Apply filters</Button>
        </div>

        {filteredQuizzes.length === 0 ? (
          <p>No quizzes ware found with used filters.</p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {filteredQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
