type SelectProps = {
  label?: string
  error?: string
  options: string[]
  placeholder: string
  value: string | number
  onChange: (value: any) => void
}

export const Select = ({
  label,
  error,
  options,
  placeholder,
  value,
  onChange,
}: SelectProps) => {
  const id = `select-${label}`

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value)
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
      <select
        id={id}
        className={`
          h-10 px-3 py-2 text-sm leading-none rounded-md border bg-surface-elevated text-content
          focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors 
          ${error ? "border-error" : "border-border"}
        `}
        value={value}
        onChange={handleChange}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt} value={opt} className="capitalize">
            {opt}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-error">{error}</span>}
    </div>
  )
}
