import { useEffect, useState } from "react"
import { QuizType, type Quiz } from "../../types/types"
import type { Route } from "./+types/preview"
import { useNavigate, useParams } from "react-router"
import { Button } from "../../components/base/Button"
import { timestampToDate } from "../../utils/timestampToDate"
import { calculateQuizDifficulty } from "../../utils/quizDifficullty"
import { Pill } from "../../components/base/Pill"
import {
  CalendarIcon,
  CircleQuestionMark,
  Swords,
  TimerIcon,
  Infinity,
} from "lucide-react"
import { useQuiz } from "../../features/quizzes/hooks/useQuiz"
import { secondsToMinutesAndSeconds } from "../../utils/time"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function Preview() {
  const { getQuiz, isLoading, error } = useQuiz()
  const navigate = useNavigate()
  const { id } = useParams()
  const [quiz, setQuiz] = useState<Quiz | null>(null)

  useEffect(() => {
    if (!id) return
    getQuiz(id as string)
      .then((data) => setQuiz(data))
      .catch(() => {})
  }, [id])

  const handlePlayQuiz = () => {
    navigate(`/play/${id}`)
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>Error: {error}</p>
  }

  if (!quiz) {
    return <p>Quiz not found.</p>
  }

  const quizDifficulty = calculateQuizDifficulty(quiz)

  const { minutes, seconds } = secondsToMinutesAndSeconds(quiz.timeLimit)
  return (
    <>
      <div>
        <h1>{quiz.title}</h1>
        <p>{quiz.description}</p>
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/40">
          <Pill icon={<CircleQuestionMark />}>
            {quiz.questions.length}{" "}
            {quiz.questions.length === 1 ? "Question" : "Questions"}
          </Pill>
          <Pill icon={<CalendarIcon />}>
            {timestampToDate(quiz.createdAt, "short")}
          </Pill>{" "}
          <Pill icon={<Swords />}>Quiz difficulty: {quizDifficulty}</Pill>
          {quiz.type === QuizType.STANDART && (
            <Pill icon={<TimerIcon />}>
              <Infinity />
            </Pill>
          )}
          {quiz.type === QuizType.TIMED && (
            <Pill icon={<TimerIcon />}>
              {minutes}
              {"m"} {seconds}
              {"s"}
            </Pill>
          )}
        </div>
        <div className="flex gap-4 mt-4">
          <Button variant="primary" onClick={handlePlayQuiz}>
            Play Quiz
          </Button>
          <Button variant="secondary" onClick={handleGoBack}>
            Go Back
          </Button>
        </div>
      </div>
    </>
  )
}
