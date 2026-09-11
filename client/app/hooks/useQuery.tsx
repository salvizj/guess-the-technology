import { useSearchParams } from "react-router"

export const useQuery = (keys: string[]) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const values: Record<string, string> = {}
  keys.forEach((key) => {
    values[key] = searchParams.get(key) || ""
  })

  const setValue = (key: string, newValue: string) => {
    setSearchParams(
      (prev) => {
        prev.set(key, newValue)
        return prev
      },
      { replace: true },
    )
  }

  const deleteValues = () => {
    setSearchParams({}, { replace: true })
  }

  return [values, setValue, deleteValues] as const
}
