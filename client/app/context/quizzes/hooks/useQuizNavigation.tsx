import { useNavigate } from "react-router"

export const useQuizNavigation = () => {
  const navigate = useNavigate()

  const handleRedirectToResultQuestions = (id: string) => {
    navigate(`/results/${id}/questions?q=1`)
  }

  const handleRedirectToPlayQuizzAgain = (id: string) => {
    navigate(`/play/${id}`)
  }

  const handleRedirectToQuizPreview = (id: string) => {
    navigate(`/quizzes/${id}`)
  }

  return {
    handleRedirectToResultQuestions,
    handleRedirectToPlayQuizzAgain,
    handleRedirectToQuizPreview,
  }
}
