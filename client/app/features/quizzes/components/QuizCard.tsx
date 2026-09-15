import {
  Book,
  CalendarIcon,
  CircleQuestionMark,
  Swords,
  TimerIcon,
  Infinity,
} from "lucide-react"
import { Pill } from "../../../components/base/Pill"
import { QuizType, type Quiz } from "../../../types/types"
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
  const timeLeftWholeMinutes = Math.floor(quiz.timeLimit / 60)
  const timeLeftLeftoverSeconds = quiz.timeLimit - timeLeftWholeMinutes * 60
  return (
    <Card
      className="flex max-w-sm flex-col justify-between gap-4 border border-border bg-surface-secondary p-5 hover:border-primary hover:bg-surface-secondary/50 hover:shadow-md"
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
        {quiz.type === QuizType.STANDART && (
          <Pill icon={<TimerIcon />}>
            <Infinity />
          </Pill>
        )}
        {quiz.type === QuizType.TIMED && (
          <Pill icon={<TimerIcon />}>
            {timeLeftWholeMinutes}
            {"m"} {timeLeftLeftoverSeconds}
            {"s"}
          </Pill>
        )}
      </div>
    </Card>
  )
}
