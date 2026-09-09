import { useState } from "react"
import {
  fetchCreateQuiz,
  fetchDeleteQuiz,
  fetchGetQuizById,
  fetchGetQuizzes,
  fetchUpdateQuiz,
} from "../api/quiz"
import type { QuizSchema } from "../../../schemas/quizSchema"
import {
  fetchCreateScore,
  fetchGetScoreByScoreId,
  fetchGetScoresByQuizId,
  fetchGetScoresByUserId,
} from "../api/score"
import type { ScoreSchema } from "../../../schemas/scoreSchema"

export const useQuiz = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createQuiz = async (data: QuizSchema) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetchCreateQuiz(data)
      return response
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create quiz"
      setError(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const updateQuiz = async (id: string, data: QuizSchema) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetchUpdateQuiz(id, data)
      return response
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to update quiz"
      setError(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const deleteQuiz = async (id: string) => {
    setIsLoading(true)
    setError(null)
    try {
      await fetchDeleteQuiz(id)
      return null
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to delete quiz"
      setError(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const getQuiz = async (id: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetchGetQuizById(id)
      return response
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch quiz"
      setError(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const getQuizzes = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetchGetQuizzes()
      return response
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch quizzes"
      setError(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const getScoresByQuizId = async (id: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetchGetScoresByQuizId(id)
      return response
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch score"
      setError(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const getScoresByUserId = async (id: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetchGetScoresByUserId(id)
      return response
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch score"
      setError(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const getScoreByScoreId = async (id: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetchGetScoreByScoreId(id)
      return response
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch score"
      setError(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const createScore = async (data: ScoreSchema, id: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetchCreateScore(data, id)
      return response
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create score"
      setError(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    error,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    getQuiz,
    getQuizzes,
    getScoresByQuizId,
    getScoresByUserId,
    getScoreByScoreId,
    createScore,
  }
}
