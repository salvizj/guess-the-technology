import { Button, getResultVariant } from "../../../components/base/Button"
import type { Question, QuizQuestionCardMode } from "../../../types/types"

type QuizQuestionCardProps = {
  question: Question
  onAnswer?: (questionId: string, answerId: string) => void
  selectedAnswers: String[]
  onNextQuestion: () => void
  onPreviousQuestion: () => void
  onToOverall?: () => void
  onSubmit?: () => void
  isLastQuestion: boolean
  isFirstQuestion: boolean
  questionIndex: number
  mode: QuizQuestionCardMode
}

export const QuizQuestionCard = ({
  question,
  onAnswer,
  selectedAnswers,
  isLastQuestion,
  isFirstQuestion,
  onNextQuestion,
  onToOverall,
  onPreviousQuestion,
  onSubmit,
  questionIndex,
  mode,
}: QuizQuestionCardProps) => {
  if (!question) {
    return <p>No question available.</p>
  }
  const isResultMode = mode === "result"
  return (
    <article className="flex flex-col gap-6 w-full max-w-xl mx-auto">
      <header className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-500">
          Question {questionIndex + 1}
        </span>
        <h2 className="text-xl font-semibold text-gray-900">
          {question.title}
        </h2>
      </header>

      {question.imageUrl && (
        <img
          src={question.imageUrl}
          alt={`Visual reference for: ${question.title}`}
          className="w-full max-h-64 object-cover rounded-lg border"
        />
      )}

      <div className="flex flex-col gap-2 p-0 list-none">
        {question.answers.map((option) => {
          const isSelected =
            selectedAnswers?.includes(String(option.id)) || false

          if (isResultMode) {
            const { variant, className } = getResultVariant(
              isSelected,
              Boolean(option.correct),
            )
            return (
              <Button
                key={option.id}
                variant={variant}
                disabled
                className={` ${className}`}
              >
                <span>{option.optionText}</span>
              </Button>
            )
          }
          return (
            <Button
              key={option.id}
              variant={isSelected ? "secondary" : "outline"}
              onClick={() => onAnswer?.(String(question.id), String(option.id))}
            >
              {option.optionText}
            </Button>
          )
        })}
      </div>

      <div className="flex items-center justify-between gap-4 pt-4">
        {isFirstQuestion ? (
          <span />
        ) : (
          <Button onClick={onPreviousQuestion} variant="secondary">
            Previous
          </Button>
        )}

        {isLastQuestion ? (
          !isResultMode ? (
            <Button onClick={onSubmit} variant="primary">
              Submit
            </Button>
          ) : (
            <Button onClick={onToOverall} variant="primary">
              To Overall results
            </Button>
          )
        ) : (
          <Button onClick={onNextQuestion} variant="primary">
            Next
          </Button>
        )}
      </div>
      {isResultMode && !isLastQuestion && (
        <div className="flex pt-4">
          <Button onClick={onToOverall} variant="primary">
            Skip to Overall results
          </Button>
        </div>
      )}
    </article>
  )
}
