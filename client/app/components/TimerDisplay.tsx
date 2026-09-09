type TimerDisplayProps = {
  timeLeftInSeconds: number
}

export const TimerDisplay = ({ timeLeftInSeconds }: TimerDisplayProps) => {
  const minutes = Math.floor(timeLeftInSeconds / 60)
  const seconds = timeLeftInSeconds % 60

  return (
    <div className="text-2xl font-bold">
      {minutes}:{seconds.toString().padStart(2, "0")}
    </div>
  )
}
