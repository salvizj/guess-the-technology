import { z } from "zod"

export const scoreSchema = z.object({
  quizId: z.number().min(1, "Quiz ID must be a positive number"),
  userId: z.number().min(1, "User ID must be a positive number"),
  score: z.number().min(0, "Score must be a positive number"),
  userAnswers: z.record(z.string(), z.array(z.string())),
})

export type ScoreSchema = z.infer<typeof scoreSchema>
