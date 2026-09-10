import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core"
import { relations, sql } from "drizzle-orm"

// 1. Users Table
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  isAdmin: integer("is_admin", { mode: "boolean" }).notNull().default(false),
})

// 2. Quizzes Table
export const quizzes = sqliteTable("quizzes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
})

// 3. Questions Table
export const questions = sqliteTable("questions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  quizId: integer("quiz_id")
    .notNull()
    .references(() => quizzes.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  imageUrl: text("image_url"),
  difficulty: text("difficulty").notNull(), // 'easy' | 'medium' | 'hard'
})

// 4. Answers Table
export const answers = sqliteTable("answers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  questionId: integer("question_id")
    .notNull()
    .references(() => questions.id, { onDelete: "cascade" }),
  optionText: text("option_text").notNull(),
  correct: integer("correct", { mode: "boolean" }).notNull(),
})

// 5. Scores Table
export const scores = sqliteTable("scores", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  quizId: integer("quiz_id")
    .notNull()
    .references(() => quizzes.id, { onDelete: "cascade" }),
  score: integer("score").notNull(),
  userAnswers: text("user_answers", { mode: "json" }).notNull(),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
})

// --- RELATIONS DEFINITIONS ---

export const usersRelations = relations(users, ({ many }) => ({
  scores: many(scores),
}))

export const quizzesRelations = relations(quizzes, ({ many }) => ({
  questions: many(questions),
  scores: many(scores),
}))

export const questionsRelations = relations(questions, ({ many, one }) => ({
  quiz: one(quizzes, {
    fields: [questions.quizId],
    references: [quizzes.id],
  }),
  answers: many(answers),
}))

export const answersRelations = relations(answers, ({ one }) => ({
  question: one(questions, {
    fields: [answers.questionId],
    references: [questions.id],
  }),
}))

export const scoresRelations = relations(scores, ({ one }) => ({
  user: one(users, {
    fields: [scores.userId],
    references: [users.id],
  }),
  quiz: one(quizzes, {
    fields: [scores.quizId],
    references: [quizzes.id],
  }),
}))
