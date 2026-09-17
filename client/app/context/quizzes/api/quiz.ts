import type { QuizSchema } from "../../../schemas/quizSchema"

const fetchCreateQuiz = async (data: QuizSchema) => {
  const res = await fetch(`/api/quiz`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || "Quiz creation failed")
  }

  return res.json()
}
const fetchGetQuizzes = async () => {
  const res = await fetch(`/api/quizzes`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || "Fetching quizzes failed")
  }

  return res.json()
}
const fetchGetQuizById = async (id: string) => {
  const res = await fetch(`/api/quiz/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || "Fetching quiz failed")
  }

  return res.json()
}
const fetchUpdateQuiz = async (id: string, data: QuizSchema) => {
  const res = await fetch(`api/quiz/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || "Updating quiz failed")
  }

  return res.json()
}
const fetchDeleteQuiz = async (id: string) => {
  const res = await fetch(`/api/quiz/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || "Deleting quiz failed")
  }

  return res.json()
}

export {
  fetchCreateQuiz,
  fetchGetQuizzes,
  fetchGetQuizById,
  fetchUpdateQuiz,
  fetchDeleteQuiz,
}
