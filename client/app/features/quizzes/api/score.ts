import type { ScoreSchema } from "../../../schemas/scoreSchema"

const fetchCreateScore = async (data: ScoreSchema, id: string) => {
  const res = await fetch(`/api/quiz/${id}/score`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || "Fetching quizzes failed")
  }

  return res.json()
}

const fetchGetScoresByQuizId = async (id: string) => {
  const res = await fetch(`/api/quiz/${id}scores/`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || "Fetching scores failed")
  }

  return res.json()
}

const fetchGetScoresByUserId = async (id: string) => {
  const res = await fetch(`/api/user/${id}/scores`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || "Fetching scores failed")
  }

  return res.json()
}

const fetchGetScoreByScoreId = async (id: string) => {
  const res = await fetch(`/api/score/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || "Fetching score failed")
  }

  return res.json()
}
export {
  fetchCreateScore,
  fetchGetScoresByQuizId,
  fetchGetScoresByUserId,
  fetchGetScoreByScoreId,
}
