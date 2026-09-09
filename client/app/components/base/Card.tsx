type CardProps = {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export const Card = ({ children, className, onClick }: CardProps) => {
  return (
    <div
      className={`rounded-lg border border-border bg-surface-elevated p-4 text-content shadow-sm hover:border-primary-light transition-colors cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
