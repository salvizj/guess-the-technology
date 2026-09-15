export type Theme = "light" | "dark"

export type Variant =
  "primary" | "secondary" | "accent" | "outline" | "ghost" | "danger"

type BaseField = {
  name: string
  label: string
  placeholder?: string
  error?: string
  accept?: string
  render?: boolean
}

export type PrimitiveFieldConfig = BaseField & {
  type:
    | "text"
    | "email"
    | "date"
    | "number"
    | "password"
    | "textarea"
    | "select"
    | "file"
  value: any
  options?: string[]
  onRemove?: () => void
  onChange: (valueOrEvent: any) => void
}

export type ArrayFieldConfig = BaseField & {
  type: "array"
  onRemove?: (index: number) => void
  onAdd: () => void

  fields: FieldConfig[][]
}

export enum QuizType {
  STANDART = "standart",
  TIMED = "timed",
}

export type FieldConfig = PrimitiveFieldConfig | ArrayFieldConfig

export enum QuestionDifficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}
export type User = {
  id: number
  username: string
  email: string
  passwordHash: string
  isAdmin?: boolean
}

export type Quiz = {
  id: number
  title: string
  description: string
  createdAt: string
  category: string
  type: QuizType
  timeLimit: number
  questions: Question[]
}

export type Question = {
  id: number
  quizId: number
  title: string
  imageUrl: string
  difficulty: QuestionDifficulty
  answers: Answer[]
}

export type Answer = {
  id: number
  questionId: number
  optionText: string
  correct: boolean
}

export type Score = {
  id: number
  userId: number
  score: number
  quizId: number
  createdAt: string
  userAnswers: Record<string, string[]>
}
export type QuizQuestionCardMode = "quiz" | "result"
