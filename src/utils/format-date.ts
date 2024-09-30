const formatDate = (data: any) => {
  const createdAtDate = new Date(data)

  // Format the date in the desired format
  const formattedDate = createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  })

  // Calculate the difference between the current time and the createdAtDate
  const diff = Date.now() - createdAtDate.getTime()
  const diffInMinutes = Math.floor(diff / (1000 * 60))
  const diffInHours = Math.floor(diff / (1000 * 60 * 60))

  return {
    formattedDate,
    diffInMinutes,
    diffInHours,
  }
}

export default formatDate
