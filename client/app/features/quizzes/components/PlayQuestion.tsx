import { Button } from "../../../components/base/Button"
import type { Question } from "../../../types/types"

type PlayQuestionProps = {
  question: Question
  onAnswer: (questionId: string, answerId: string) => void
  selectedAnswerIds: Record<string, string[]>
  onNextQuestion: () => void
  onPreviousQuestion: () => void
  onSubmit: () => void
  isLastQuestion: boolean
  isFirstQuestion: boolean
  questionIndex: number
}

export const PlayQuestion = ({
  question,
  onAnswer,
  selectedAnswerIds,
  isLastQuestion,
  isFirstQuestion,
  onNextQuestion,
  onPreviousQuestion,
  onSubmit,
  questionIndex,
}: PlayQuestionProps) => {
  if (!question) {
    return <p>No question available.</p>
  }
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

      <ul className="flex flex-col gap-2 p-0 list-none">
        {question.answers.map((option) => {
          const isSelected = selectedAnswerIds[question.id]?.includes(
            String(option.id),
          )
          return (
            <li key={option.id}>
              <Button
                onClick={() => onAnswer(String(question.id), String(option.id))}
                variant={isSelected ? "secondary" : "outline"}
                className="w-full justify-start text-left"
              >
                {option.optionText}
              </Button>
            </li>
          )
        })}
      </ul>

      <div className="flex items-center justify-between gap-4 pt-4">
        {!isFirstQuestion ? (
          <Button onClick={onPreviousQuestion} variant="secondary">
            Previous
          </Button>
        ) : (
          <span />
        )}

        {isLastQuestion ? (
          <Button onClick={onSubmit} variant="primary">
            Submit
          </Button>
        ) : (
          <Button onClick={onNextQuestion} variant="primary">
            Next
          </Button>
        )}
      </div>
    </article>
  )
}
