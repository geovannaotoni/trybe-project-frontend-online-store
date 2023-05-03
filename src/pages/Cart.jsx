import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { IconButton } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import { getProductsFromStorage } from '../services/localStorage';

class Cart extends Component {
  state = {
    cartProducts: [],
  };

  componentDidMount() {
    const cartProducts = getProductsFromStorage();
    this.setState({
      cartProducts,
    });
  }

  render() {
    const { cartProducts } = this.state;
    const { history: { goBack } } = this.props;
    return (
      <section>
        <IconButton onClick={ () => goBack() }>
          <ReplyIcon />
        </IconButton>
        {
          cartProducts.length === 0 ? (
            <p data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </p>
          ) : (
            cartProducts.map((product) => (
              <article key={ product.id }>
                <p data-testid="shopping-cart-product-name">{ product.title }</p>
                <p>{ product.price }</p>
                <p data-testid="shopping-cart-product-quantity">{ product.quantity }</p>
              </article>
            ))
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
