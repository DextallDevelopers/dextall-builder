export const useComputePrice = (facadeArea, subtotalPrice, tax) => {
  const totalPrice = useState('totalPrice', () => '0')
  if (!facadeArea || !subtotalPrice || !tax) {
    return { totalPrice }
  }

  const regex = /[\d|\.|\,]+/

  const computedFacadeArea = +facadeArea.match(regex)
  const computedSubtotalPrice = +subtotalPrice.match(regex)
  const computedTax = +tax.match(regex) / 100

  const priceWithoutTax = computedFacadeArea * computedSubtotalPrice

  const total = String(priceWithoutTax * computedTax + priceWithoutTax)

  totalPrice.value = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(+total)

  return { totalPrice }
}
