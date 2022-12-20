export const useQuoteDate = () => {
  const DateDiff = {
    inDays: function (d1, d2) {
      const t2 = d2.getTime()
      const t1 = d1.getTime()

      return Math.floor((t2 - t1) / (24 * 3600 * 1000))
    },
  }

  const startDate = new Date('2022-10-25T12:00:00')

  const startFormattedDate = useFormattedDate(startDate)

  const endDate = new Date('2022-11-26T11:00:00')

  const endFormattedDate = useFormattedDate(endDate)

  const todayDate = new Date()

  const leftDate = DateDiff.inDays(todayDate, endDate)

  const timeLeft = computed(() => {
    if (leftDate > 0) {
      return leftDate + ' days'
    }
    return 'Offer has expired'
  })

  return { startFormattedDate, timeLeft, endFormattedDate }
}
