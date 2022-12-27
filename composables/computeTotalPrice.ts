export const useComputePrice = (facadeArea, subtotalPrice, tax) => {

  if (!facadeArea || !subtotalPrice || !tax) {
    return { totalPrice: 0 }
  }

  const computedFacadeArea = +facadeArea.replace(/\D/gm, '')
  const computedSubtotalPrice = +subtotalPrice.replace(/\D/gm, '')
  const computedTax = +tax.replace(/\D/gm, '')

    
  const totalPrice = (computedFacadeArea * computedSubtotalPrice + computedTax).toFixed(2)

  return { totalPrice }
}
