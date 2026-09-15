import { useEffect, useState } from "react"
import { secondsToMinutesAndSeconds } from "../utils/time"

type UseTimerProps = {
  timeLeftInSeconds: number
  onTimeRanOut(): void
}

export const useTimer = ({
  timeLeftInSeconds,
  onTimeRanOut,
}: UseTimerProps) => {
  const [currentTime, setCurrentTime] = useState(timeLeftInSeconds)

  useEffect(() => {
    if (currentTime <= 0) {
      onTimeRanOut()
      return
    }

    const timer = setInterval(() => {
      setCurrentTime((prevTime) => prevTime - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [currentTime, onTimeRanOut])

  const { minutes, seconds } = secondsToMinutesAndSeconds(currentTime)
  return [minutes, seconds]
}
