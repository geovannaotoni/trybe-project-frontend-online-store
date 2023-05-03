import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { getProductsFromStorage, setProductsOnStorage } from '../services/localStorage';

class ProductItem extends Component {
  addProductsToCart = (product) => {
    const oldList = getProductsFromStorage();
    const findProduct = oldList.find(({ id }) => product.id === id); // encontra o produto no carrinho, se ele já estiver salvo no localStorage
    if (findProduct) {
      const newQuantity = findProduct.quantity + 1;
      const index = oldList.indexOf(findProduct);
      oldList.splice(index, 1); // retira o produto já existente
      setProductsOnStorage([...oldList, { ...product, quantity: newQuantity }]); // adiciona ele novamente com a nova quantidade
    } else { // se nao estiver salvo no carrinho, cria uma nova lista e adiciona ele no final dela
      const newList = [...oldList, { ...product, quantity: 1 }]; // // recupera a lista antiga, acrescentando nela o novo produto
      setProductsOnStorage(newList);
    }
    // const { history: { push } } = this.props;
    // push('/cart');
  };

  render() {
    const { product } = this.props;
    return (
      <>
        <Link to={ `/productDetail/${product.id}` } data-testid="product-detail-link">
          <h4>{product.title}</h4>
          <img
            src={ product.thumbnail }
            alt={ product.name }
          />
          <h4>{product.price}</h4>
        </Link>
        <IconButton
          data-testid="product-add-to-cart"
          onClick={ () => this.addProductsToCart(product) }
        >
          <AddShoppingCartIcon />
        </IconButton>
      </>
    );
  }
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProductItem;
