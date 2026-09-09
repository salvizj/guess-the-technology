import type { Route } from "./+types/login"
import type { LoginSchema } from "../../schemas/loginSchema"
import { useAuthContext } from "../../context/useAuthContext"
import { LoginForm } from "../../features/auth/components/LoginForm"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function Login() {
  const { handleLogin, isLoading, error } = useAuthContext()
  const onSubmit = (formData: LoginSchema) => {
    handleLogin(formData)
  }

  return (
    <>
      <LoginForm onSubmit={onSubmit} isLoading={isLoading} error={error} />
    </>
  )
}
