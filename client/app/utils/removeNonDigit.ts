export const removeNonDigit = (input: string): string => {
  return input.replace(/\D/g, "")
}
