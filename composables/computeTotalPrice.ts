export const useComputePrice = () => {
  const facadeArea = 21322
  const subtotalPrice = 64.18
  const tax = 8.875

  const totalPrice = (facadeArea * subtotalPrice + tax).toFixed(2)

  return { facadeArea, subtotalPrice, tax, totalPrice }
}
