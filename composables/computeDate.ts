export const useFormattedDate = unformattedDate => {
  const date = new Date(unformattedDate)
  const day = date.getDate() <= 9 ? '0' + date.getDate() : date.getDate()
  const month = date.getMonth() + 1 <= 9 ? '0' + date.getMonth() + 1 : date.getMonth() + 1
  const year = date.getFullYear()
  return `${day}.${month}.${year}`
}
