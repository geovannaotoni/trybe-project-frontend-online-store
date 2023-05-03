import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { IconButton } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import { Add, Remove, Clear } from '@mui/icons-material';
import { getProductsFromStorage, setProductsOnStorage } from '../services/localStorage';

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

  // operation(increase,decrease) = aumentar ou diminuir a quantidade de itens do produto
  setProductQuantity = (id, operation) => {
    const { cartProducts } = this.state;
    const item = cartProducts.find((product) => product.id === id);

    if (operation === 'increase') {
      item.quantity += 1;
    } else if (item.quantity > 1) {
      item.quantity -= 1;
    }

    this.setState({
      cartProducts,
    });

    setProductsOnStorage(cartProducts);
  };

  // deletando o produto pelo id
  deleteProduct(id) {
    const { cartProducts } = this.state;
    const itemToRemove = cartProducts.find((product) => product.id === id);
    const index = cartProducts.indexOf(itemToRemove);
    cartProducts.splice(index, 1);

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
                <IconButton
                  data-testid="product-decrease-quantity"
                  onClick={ () => this.setProductQuantity(product.id, 'decrease') }
                >
                  <Remove />
                </IconButton>
                <p data-testid="shopping-cart-product-quantity">{ product.quantity }</p>
                <IconButton
                  data-testid="product-increase-quantity"
                  onClick={ () => this.setProductQuantity(product.id, 'increase') }
                >
                  <Add />
                </IconButton>
                <IconButton
                  data-testid="remove-product"
                  onClick={ () => this.deleteProduct(product.id) }
                >
                  <Clear />
                </IconButton>
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
