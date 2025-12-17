
  export const getProductsText = (count: number) => {
    if (count === 1) return "1 продукт"
    if (count > 1 && count < 5) return `${count} продукта`
    return `${count} продуктов`
  }

  export const correctValue = (count: number | null) => {
    return Math.round(count ?? 0);
}