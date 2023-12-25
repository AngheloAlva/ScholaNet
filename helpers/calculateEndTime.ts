export const calculateEndTime = (startTime: string, durationBlocks: number): string => {
  const [hours, minutes] = startTime.split(':').map(Number)
  const startTimeInMinutes = hours * 60 + minutes

  const totalDurationInMinutes = durationBlocks * 45 + (durationBlocks - 1) * 10
  const endTimeInMinutes = startTimeInMinutes + totalDurationInMinutes

  const endHours = Math.floor(endTimeInMinutes / 60)
  const endMinutes = endTimeInMinutes % 60

  return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`
}
