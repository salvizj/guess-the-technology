import { z } from "zod"
import { QuestionDifficulty, QuizType } from "../types/types"

export const answerSchema = z.object({
  option_text: z.string().min(1, "Option text cannot be empty"),
  correct: z.preprocess(
    (value) => value === "true" || value === true,
    z.boolean(),
  ),
})

export const questionSchema = z.object({
  title: z.string().min(3, "Question title must be at least 3 characters"),
  image: z
    .string()
    .refine((val) => val === "" || val.startsWith("data:image/"), {
      message: "Must be a valid image file (PNG, JPEG, WebP, GIF, SVG)",
    }),
  difficulty: z.enum(QuestionDifficulty, {
    message: "Select a valid difficulty",
  }),

  answers: z
    .array(answerSchema)
    .min(2, "Each question requires at least 2 options")
    .refine((answers) => answers.some((a) => a.correct), {
      message: "At least one option must be marked as correct",
    }),
})

export const quizSchema = z.object({
  title: z.string().min(3, "Quiz title must be at least 3 characters"),
  description: z
    .string()
    .min(10, "Quiz description must be at least 10 characters"),
  type: z.enum(QuizType, {
    message: "Select a valid type",
  }),
  timeLimit: z.coerce.number().min(1, "Enter a valid timelimit"),
  category: z
    .string()
    .min(3, "Question category must be at least 3 characters"),
  questions: z
    .array(questionSchema)
    .min(1, "Quiz must contain at least 1 question"),
})

export type QuizSchema = z.infer<typeof quizSchema>
export type QuestionSchema = z.infer<typeof questionSchema>
export type AnswerSchema = z.infer<typeof answerSchema>
