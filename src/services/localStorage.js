export function setProductsOnStorage(cartProducts) {
  localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
}

export function getProductsFromStorage() {
  const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
  if (cartProducts) {
    return cartProducts;
  }
  return [];
}

export function setEvaOnStorage(id, evaluations) {
  localStorage.setItem(id, JSON.stringify(evaluations));
}

export function getEvaFromStorage(id) {
  const evaluations = JSON.parse(localStorage.getItem(id));
  if (evaluations) {
    return evaluations;
  }
  return [];
}

export function setAmountOnStorage(quantity) {
  localStorage.setItem('cartAmount', JSON.stringify(quantity));
}

export function getAmountFromStorage() {
  const cartProducts = getProductsFromStorage();
  return cartProducts.reduce(((acc, product) => acc + product.quantity), 0);
}
