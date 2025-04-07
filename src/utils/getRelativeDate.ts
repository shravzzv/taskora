const getRelativeDate = (date: string): string => {
  const targetDate = new Date(date)
  const today = new Date()
  const diffInDays = Math.floor(
    (targetDate.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0)) /
      (1000 * 60 * 60 * 24)
  )

  if (diffInDays === 0) {
    return `today ${targetDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`
  } else if (diffInDays === -1) {
    return 'yesterday'
  } else if (diffInDays === 1) {
    return 'tomorrow'
  } else if (diffInDays < -1) {
    return `${Math.abs(diffInDays)} days ago`
  } else {
    return `in ${diffInDays} days`
  }
}

export default getRelativeDate
