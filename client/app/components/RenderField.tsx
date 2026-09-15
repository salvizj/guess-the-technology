import type { FieldConfig } from "../types/types"
import { Button } from "./base/Button"
import { Input } from "./base/Input"
import { Select } from "./base/Select"

export const RenderField = ({ field }: { field: FieldConfig }) => {
  if (field.render === false) {
    return
  }

  if (field.type === "array") {
    return (
      <div className="flex flex-col gap-6 w-full">
        {field.label && (
          <div className="border-b border-border pb-2 flex items-center justify-between">
            <h3 className="text-xl font-bold tracking-tight text-content">
              {field.label}
            </h3>
            {field.onAdd && (
              <Button onClick={field.onAdd} variant="outline">
                Add {field.label.slice(0, -1) || "Item"}
              </Button>
            )}
          </div>
        )}

        <div className="flex flex-col gap-6">
          {field.fields.map((subFields, index) => (
            <div
              key={`${field.name}-${index}`}
              className="flex flex-col gap-5 border border-border bg-surface-elevated p-6 "
            >
              <div className="flex items-center justify-between border-b border-border/50 pb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-content-muted">
                  {field.label?.slice(0, -1) || "Item"} #{index + 1}
                </span>
                {field.onRemove && (
                  <Button
                    onClick={() => field.onRemove?.(index)}
                    variant="outline"
                  >
                    Remove {field.label?.slice(0, -1) || "Item"}
                  </Button>
                )}
              </div>

              <div className="flex flex-col gap-4 text-content">
                {subFields.map((subField) => (
                  <RenderField key={subField.name} field={subField} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (field.type === "select") {
    return (
      <Select
        label={field.label}
        placeholder={field.placeholder ?? ""}
        options={field.options ?? []}
        value={field.value}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          field.onChange(e.target.value)
        }
        error={field.error}
      />
    )
  }

  if (field.type === "file") {
    return (
      <Input
        label={field.label}
        type={field.type}
        placeholder={field.placeholder ?? ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          field.onChange(e.target.files?.[0] ?? null)
        }
        error={field.error}
      />
    )
  }

  return (
    <Input
      label={field.label}
      type={field.type}
      placeholder={field.placeholder ?? ""}
      value={field.value}
      onChange={(e) => field.onChange(e.target.value)}
      error={field.error}
    />
  )
}
