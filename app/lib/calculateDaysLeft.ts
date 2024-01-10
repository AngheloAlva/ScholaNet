export const calculateDaysLeft = (dueDate: string): number => {
  const dueDateInMs = new Date(dueDate).getTime()
  const todayInMs = new Date().getTime()

  return Math.floor((dueDateInMs - todayInMs) / (1000 * 60 * 60 * 24))
}
