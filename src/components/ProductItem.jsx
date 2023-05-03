import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

class ProductItem extends Component {
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
          onClick={ () => {} }
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
};

export default ProductItem;
