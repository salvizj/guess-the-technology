import { useTimer } from "../hooks/useTimer"

type TimerDisplayProps = {
  timeLeftInSeconds: number
  onTimeRanOut(): void
}

export const TimerDisplay = ({
  timeLeftInSeconds,
  onTimeRanOut,
}: TimerDisplayProps) => {
  const [minutes, seconds] = useTimer({
    timeLeftInSeconds,
    onTimeRanOut,
  })

  return (
    <div className="text-2xl font-bold border-b borrder-border">
      Time remaining
      {minutes > 0 && <span>{minutes} minutes</span>}
      {"m"} {seconds}
      {"s"}
    </div>
  )
}
