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

export function setEvaOnStorage(id, avaliacao) {
  localStorage.setItem(id, JSON.stringify(avaliacao));
}

export function getEvaFromStorage(id) {
  const avaliacao = JSON.parse(localStorage.getItem(id));
  if (avaliacao) {
    return avaliacao;
  }
  return [];
}
