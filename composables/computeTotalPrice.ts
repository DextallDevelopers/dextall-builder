export const useComputePrice = (facadeArea, subtotalPrice, tax) => {
  if (!facadeArea || !subtotalPrice || !tax) {
    return { totalPrice: 0 }
  }
  const regex = /[\d|\.|\,]+/

  const computedFacadeArea = +facadeArea.match(regex)
  const computedSubtotalPrice = +subtotalPrice.match(regex)
  const computedTax = +tax.match(regex) / 100

  const priceWithoutTax = computedFacadeArea * computedSubtotalPrice

  let totalPrice = String(priceWithoutTax * computedTax + priceWithoutTax)

  totalPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(+totalPrice)

  return { totalPrice }
}
