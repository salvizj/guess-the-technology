import { useState } from "react"
import type { FieldConfig } from "../../../types/types"
import type z from "zod"
import {
  registerSchema,
  type RegisterSchema,
} from "../../../schemas/registerSchema"
import { clearFieldError } from "../../../utils/clearFieldErrors"
import { Form } from "../../../components/base/Form"

type RegisterFormProps = {
  onSubmit: (formData: RegisterSchema) => void
  submitLabel?: string
  isLoading?: boolean
  error?: string | null
}

export const RegisterForm = ({
  onSubmit,
  submitLabel = "Register",
  isLoading,
  error,
}: RegisterFormProps) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string
  }>({})

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setValidationErrors({})

    const res = registerSchema.safeParse(formData)

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

  const registerFields: FieldConfig[] = [
    {
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "Enter your username",
      value: formData.username,
      onChange: (value) => {
        setFormData({ ...formData, username: value })
        clearFieldError("username", setValidationErrors)
      },
      error: validationErrors.username,
    },
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
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm your password",
      value: formData.confirmPassword,
      onChange: (value) => {
        setFormData({ ...formData, confirmPassword: value })
        clearFieldError("confirmPassword", setValidationErrors)
      },
      error: validationErrors.confirmPassword,
    },
  ]
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-4">
      <h2>Register</h2>
      <Form
        fields={registerFields}
        onSubmit={handleSubmit}
        submitLabel={submitLabel}
        isLoading={isLoading}
        error={error}
      />
    </div>
  )
}
