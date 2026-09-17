import { Trophy, CalendarIcon } from "lucide-react"
import { Button } from "../../../components/base/Button"
import { Card } from "../../../components/base/Card"
import type { Quiz, Score } from "../../../types/types"
import { timestampToDate } from "../../../utils/timestampToDate"
import { useNavigate } from "react-router"
import { Pill } from "../../../components/base/Pill"
import { useEffect, useState } from "react"
import { useQuiz } from "../hooks/useQuiz"
import { useQuizNavigation } from "../hooks/useQuizNavigation"

type ProfileResultsQuizCardProps = {
  score: Score
}
export const ProfileResultsQuizCard = ({
  score,
}: ProfileResultsQuizCardProps) => {
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const { getQuiz, isLoading, error } = useQuiz()
  const { handleRedirectToPlayQuizzAgain, handleRedirectToResultQuestions } =
    useQuizNavigation()
  const calculateQuestionAccuracy = (score: Score) => {}
  useEffect(() => {
    if (!score.quizId || quiz != null) return

    getQuiz(String(score.quizId))
      .then((data: Quiz) => setQuiz(data))
      .catch(() => {})
  }, [score.quizId])

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
    <Card
      className="flex flex-col max-w-sm justify-between gap-4 border border-border bg-surface-secondary p-5 hover:border-primary hover:bg-surface-secondary/50 hover:shadow-md"
      onClick={() => handleRedirectToResultQuestions(String(score.id))}
    >
      <div className="space-y-1.5">
        <h3 className="line-clamp-1 font-semibold">{quiz.title}</h3>
        <p className="line-clamp-2 text-sm text-content-secondary">
          {quiz.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-y border-border/40 py-3 text-xs">
        <Pill icon={<Trophy className="h-4 w-4" />}>Score: {score.score}</Pill>
        <Pill icon={<Trophy className="h-4 w-4" />}>Accuracy: %</Pill>
        <Pill icon={<CalendarIcon className="h-4 w-4" />}>
          {timestampToDate(score.createdAt, "short")}
        </Pill>
      </div>

      <Button
        onClick={() => handleRedirectToPlayQuizzAgain(String(score.quizId))}
      >
        Play Again
      </Button>
    </Card>
  )
}
