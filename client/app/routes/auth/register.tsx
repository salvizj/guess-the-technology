import type { Route } from "./+types/register"
import type { RegisterSchema } from "../../schemas/registerSchema"
import { useAuthContext } from "../../context/useAuthContext"
import { RegisterForm } from "../../features/auth/components/RegisterForm"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function Register() {
  const { handleRegister, isLoading, error } = useAuthContext()
  const onSubmit = (formData: RegisterSchema) => {
    handleRegister(formData)
  }
  return (
    <>
      <RegisterForm onSubmit={onSubmit} isLoading={isLoading} error={error} />
    </>
  )
}
