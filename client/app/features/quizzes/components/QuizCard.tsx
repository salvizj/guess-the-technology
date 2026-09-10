import { Book, CalendarIcon, CircleQuestionMark, Swords } from "lucide-react"
import { Pill } from "../../../components/base/Pill"
import type { Quiz } from "../../../types/types"
import { timestampToDate } from "../../../utils/timestampToDate"
import { calculateQuizDifficulty } from "../../../utils/quizDifficullty"
import { Card } from "../../../components/base/Card"
import { useQuizNavigation } from "../hooks/useQuizNavigation"

type QuizCardProps = {
  quiz: Quiz
}
export const QuizCard = ({ quiz }: QuizCardProps) => {
  const quizDifficulty = calculateQuizDifficulty(quiz)
  const { handleRedirectToQuizPreview } = useQuizNavigation()
  return (
    <Card
      className="flex flex-col justify-between gap-4 border border-border bg-surface-secondary p-5 hover:border-primary hover:bg-surface-secondary/50 hover:shadow-md"
      onClick={() => handleRedirectToQuizPreview(String(quiz.id))}
    >
      <div className="space-y-1.5">
        <h3 className="line-clamp-1">{quiz.title}</h3>
        <p className="line-clamp-2 text-content-secondary">
          {quiz.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/40">
        <Pill icon={<CircleQuestionMark />}>
          {quiz.questions.length}{" "}
          {quiz.questions.length === 1 ? "Question" : "Questions"}
        </Pill>
        <Pill icon={<CalendarIcon />}>
          {timestampToDate(quiz.createdAt, "short")}
        </Pill>
        <Pill icon={<Swords />}>Quiz difficulty: {quizDifficulty}</Pill>
        <Pill icon={<Book />}> {quiz.category}</Pill>
      </div>
    </Card>
  )
}
