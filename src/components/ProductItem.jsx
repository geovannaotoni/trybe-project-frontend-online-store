import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { getProductsFromStorage, setProductsOnStorage } from '../services/localStorage';

class ProductItem extends Component {
  addProductsToCart = (product) => {
    const oldList = getProductsFromStorage();
    const newList = [...oldList, { ...product, quantity: 1 }];
    setProductsOnStorage(newList);
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
