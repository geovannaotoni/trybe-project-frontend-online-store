import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ProductItem extends Component {
  render() {
    const { product } = this.props;
    return (
      <>
        <h4>{product.title}</h4>
        <img
          src={ product.thumbnail }
          alt={ product.name }
        />
        <h4>{product.price}</h4>
      </>
    );
  }
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.string,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

export default ProductItem;
