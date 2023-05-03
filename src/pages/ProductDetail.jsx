import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import ReplyIcon from '@mui/icons-material/Reply';
import { Link } from 'react-router-dom';

class ProductDetail extends Component {
  render() {
    const { history: { goBack } } = this.props;
    return (
      <div>
        <IconButton onClick={ () => goBack() }>
          <ReplyIcon />
        </IconButton>
        <Link to="/cart">
          <IconButton data-testid="shopping-cart-button">
            <ShoppingCart />
          </IconButton>
        </Link>
      </div>
    );
  }
}

ProductDetail.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};

export default ProductDetail;
