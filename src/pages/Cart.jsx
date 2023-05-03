import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Cart extends Component {
  state = {
    cartProducts: [],
  };

  render() {
    const { cartProducts } = this.state;
    const { history: { goBack } } = this.props;
    return (
      <section>
        <button onClick={ () => goBack() }>Voltar</button>
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
