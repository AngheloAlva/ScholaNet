import { useState, useEffect } from 'react'

function useTimer (getStartTime: () => Date, duration: number): number {
  const calculateTimeLeft = (): number => {
    const currentTime = new Date()
    const startTime = getStartTime()
    const timeElapsed = currentTime.getTime() - startTime.getTime()
    const durationInMilliseconds = duration * 60000
    const remainingTime = Math.max(0, durationInMilliseconds - timeElapsed)
    return Math.floor(remainingTime / 1000)
  }

  const [timeLeft, setTimeLeft] = useState<number>(0)

  useEffect(() => {
    const timerId = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => { clearTimeout(timerId) }
  }, [timeLeft, getStartTime, duration])

  useEffect(() => {
    setTimeLeft(calculateTimeLeft())
  }, [getStartTime, duration])

  return timeLeft
}

export default useTimer
