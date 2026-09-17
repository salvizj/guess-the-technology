import { removeNonDigit } from "../../utils/removeNonDigit"

type InputProps = {
  label?: string
  error?: string
  type: string
  placeholder: string
  required?: boolean
  value?: any
  onChange: (value: any) => void
}

export const Input = ({
  label,
  error,
  type,
  placeholder,
  required = false,
  value,
  onChange,
}: InputProps) => {
  const id = `input-${label}`

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "file") {
      onChange(e.target.files?.[0] ?? null)
      return
    }

    let input = e.target.value
    if (type === "number") {
      input = removeNonDigit(input)
    }
    onChange(input)
  }

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-content-secondary"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type === "number" ? "text" : type}
        className={`
          h-10 px-3 py-2 text-sm leading-none rounded-md border bg-surface-elevated text-content
          placeholder:text-content-muted
          focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors
          ${error ? "border-error" : "border-border"}
          ${
            type === "file"
              ? `
            file:mr-3 file:py-1 file:px-3
            file:rounded-md file:border-0
            file:bg-secondary file:text-white
            file:cursor-pointer
          `
              : ""
          }
        `}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={handleChange}
      />
      {error && <span className="text-xs text-error">{error}</span>}
    </div>
  )
}
