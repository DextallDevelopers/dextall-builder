const formatPrice = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

export const useComputePrice = (facadeArea, subtotalPrice, tax) => {
  const totalPrice = useState('totalPrice', () => '0')
  const subtotalPriceUSD = useState('subtotalPriceUSD', () => '0')
  const taxUSD = useState('taxUSD', () => '0')

  if (!facadeArea || !subtotalPrice || !tax) {
    return { totalPrice }
  }

  const regex = /[\d|\.|\,]+/

  const computedFacadeArea = +facadeArea.match(regex)
  const computedSubtotalPrice = +subtotalPrice.match(regex)
  const computedTax = +tax.match(regex) / 100

  const priceWithoutTax = computedFacadeArea * computedSubtotalPrice // Subtotal price

  const total = String(priceWithoutTax * computedTax + priceWithoutTax)

  totalPrice.value = formatPrice(+total)
  subtotalPriceUSD.value = formatPrice(priceWithoutTax)
  taxUSD.value = formatPrice(computedTax * priceWithoutTax)

  return { totalPrice, subtotalPriceUSD, taxUSD }
}
