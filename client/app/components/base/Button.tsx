import type { ReactNode } from "react"
import type { Variant } from "../../types/types"

type ButtonProps = {
  variant?: Variant
  children?: ReactNode
  type?: "button" | "submit"
  onClick?: () => void
  noPadding?: boolean
  noFocus?: boolean
  className?: string
  isActive?: boolean
  disabled?: boolean
}

export const variantClasses = {
  primary:
    "bg-[var(--color-primary)] text-white border border-[var(--color-primary)] hover:bg-[var(--color-primary-light)] hover:border-[var(--color-primary-light)] ",
  secondary:
    "bg-[var(--color-secondary)] text-white border border-[var(--color-secondary)] hover:opacity-90",
  accent:
    "bg-[var(--color-accent)] text-[var(--color-content)] border border-[var(--color-accent)] hover:opacity-90",
  outline:
    "bg-transparent text-[var(--color-content)] border border-[var(--color-border)] hover:bg-[var(--color-surface-secondary)]",
  ghost:
    "bg-transparent text-[var(--color-content)] border border-transparent hover:bg-[var(--color-surface-secondary)]",
  danger:
    "bg-[var(--color-error)] text-white border border-[var(--color-error)] hover:opacity-90",
}

export const getResultVariant = (isSelected: boolean, isCorrect: boolean) => {
  if (isCorrect) {
    return {
      variant: "primary" as const,
      className:
        "bg-success text-success-content border-success hover:bg-success cursor-default",
    }
  }

  if (isSelected) {
    return {
      variant: "danger" as const,
      className:
        "bg-error text-error-content border-error hover:bg-error cursor-default",
    }
  }

  return {
    variant: "outline" as const,
    className:
      "opacity-60 cursor-default border-border text-muted-foreground hover:bg-transparent",
  }
}

export const activeClasses = {
  primary:
    "bg-[var(--color-primary-dark)] text-white border border-[var(--color-primary-dark)] font-semibold ring-2 ring-[var(--color-primary)]/20",
  secondary:
    "bg-[var(--color-secondary)] text-white border border-[var(--color-secondary)] font-semibold brightness-95",
  accent:
    "bg-[var(--color-accent)] text-[var(--color-content)] border border-[var(--color-accent)] font-semibold brightness-95",
  outline:
    "bg-[var(--color-surface-secondary)] text-[var(--color-primary)] border border-[var(--color-primary)] font-semibold",
  ghost:
    "bg-[var(--color-surface-secondary)] text-[var(--color-primary)] font-semibold",
  danger:
    "bg-[var(--color-error)] text-white border border-[var(--color-error)] font-semibold brightness-95",
}

export const Button = ({
  variant = "primary",
  children,
  type = "button",
  onClick,
  noPadding = false,
  noFocus = true,
  className = "",
  isActive = false,
  disabled = false,
  ...rest
}: ButtonProps) => {
  const base =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"

  const spacing = noPadding ? "" : "gap-2 px-4 py-2"
  const focus = noFocus
    ? ""
    : "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)] focus:ring-offset-2 "
  const appliedVariant = isActive
    ? activeClasses[variant]
    : variantClasses[variant]
  return (
    <button
      {...rest}
      type={type}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }}
      className={`${base} ${spacing} ${focus} ${appliedVariant} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
