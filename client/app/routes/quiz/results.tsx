import { useParams } from "react-router"
import type { Route } from "./+types/results"
import { useEffect, useState } from "react"
import type { Quiz, Score } from "../../types/types"
import { QuizQuestionCard } from "../../features/quizzes/components/QuizQuestionCard"
import { useQuiz } from "../../features/quizzes/hooks/useQuiz"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function Results() {
  const { isLoading, error, getScoreByScoreId, getQuiz } = useQuiz()
  const { id } = useParams()
  const [score, setScore] = useState<Score | null>(null)
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [currQArrIndex, setCurrQArrIndex] = useState(0)

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
  return (
    <QuizQuestionCard
      question={quiz.questions[currQArrIndex]}
      selectedAnswers={score.userAnswers[quiz.questions[currQArrIndex].id]}
      onNextQuestion={handleNextQuestion}
      onPreviousQuestion={handlePreviousQuestion}
      isLastQuestion={currQArrIndex === quiz.questions.length - 1}
      isFirstQuestion={currQArrIndex === 0}
      questionIndex={currQArrIndex}
      mode={"result"}
    />
  )
}
