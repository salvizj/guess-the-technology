import { useState } from "react"
import type { FieldConfig } from "../../../types/types"
import type z from "zod"
import { loginSchema, type LoginSchema } from "../../../schemas/loginSchema"
import { clearFieldError } from "../../../utils/clearFieldErrors"
import { Form } from "../../../components/base/Form"

type LoginFormProps = {
  onSubmit: (formData: LoginSchema) => void
  submitLabel?: string
  isLoading?: boolean
  error?: string | null
}

export const LoginForm = ({
  onSubmit,
  submitLabel = "Login",
  isLoading,
  error,
}: LoginFormProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string
  }>({})

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setValidationErrors({})

    const res = loginSchema.safeParse(formData)

    if (!res.success) {
      const fieldErrors = Object.fromEntries(
        res.error.issues.map((issue: z.core.$ZodIssue) => [
          String(issue.path[0]),
          issue.message,
        ]),
      )
      setValidationErrors(fieldErrors)
      return
    }

    setValidationErrors({})
    onSubmit(res.data)
  }
  const loginFields: FieldConfig[] = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      value: formData.email,
      onChange: (value) => {
        setFormData({ ...formData, email: value })
        clearFieldError("email", setValidationErrors)
      },
      error: validationErrors.email,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      value: formData.password,
      onChange: (value) => {
        setFormData({ ...formData, password: value })
        clearFieldError("password", setValidationErrors)
      },
      error: validationErrors.password,
    },
  ]
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-4">
      <h2>Login</h2>
      <Form
        fields={loginFields}
        onSubmit={handleSubmit}
        submitLabel={submitLabel}
        isLoading={isLoading}
        error={error}
      />
    </div>
  )
}
