import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { IconButton } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';

class Cart extends Component {
  state = {
    cartProducts: [],
  };

  render() {
    const { cartProducts } = this.state;
    const { history: { goBack } } = this.props;
    return (
      <section>
        <IconButton onClick={ () => goBack() }>
          <ReplyIcon />
        </IconButton>
        {
          !cartProducts.length && (
            <p data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </p>
          )
        }
      </section>
    );
  }
}

Cart.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};

export default Cart;
