export const useQuoteDate = (startDate, endDate) => {
  const DateDiff = {
    inDays: function (d1, d2) {
      const t2 = d2.getTime()
      const t1 = d1.getTime()

      return Math.round((t2 - t1) / (24 * 3600 * 1000))
    },
  }

  const startFormattedDate = useFormattedDate(new Date(startDate))

  const endFormattedDate = useFormattedDate(new Date(endDate))

  const todayDate = new Date()

  const leftDate = DateDiff.inDays(todayDate, new Date(endDate))

  const timeLeft = computed(() => {
    if (leftDate > 0) {
      return leftDate + ' days'
    }
    return 'Offer has expired'
  })

  return { startFormattedDate, timeLeft, endFormattedDate }
}
