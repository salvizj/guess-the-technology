import type { Quiz, Score } from "../../../types/types"
import { Button } from "../../../components/base/Button"
import { Card } from "../../../components/base/Card"

type OverallResultsProps = {
  score: Score
  quiz: Quiz
  onReviewQuestions: (id: string) => void
}

export const OverallResults = ({
  score,
  quiz,
  onReviewQuestions,
}: OverallResultsProps) => {
  return (
    <Card className="flex flex-col justify-between gap-4 border border-border bg-surface-secondary p-5 hover:border-primary hover:bg-surface-secondary/50 hover:shadow-md">
      <h1>Quiz Completed</h1>
      <div className="space-y-1.5">
        <h3 className="line-clamp-1">{quiz.title}</h3>
      </div>

      <div className="grid grid-cols-3 gap-4 py-4 text-center border-y border-gray-100">
        <div>{score.score}</div>
      </div>

      <div className="flex justify-center pt-2">
        <Button
          onClick={() => onReviewQuestions(String(score.id))}
          variant="primary"
        >
          Review Questions
        </Button>
      </div>
    </Card>
  )
}
