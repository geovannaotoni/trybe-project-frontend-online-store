import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import { Add, Remove, Clear, ShoppingCart } from '@mui/icons-material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { getProductsFromStorage, setProductsOnStorage } from '../services/localStorage';
import '../styles/Cart.css';

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
      if (item.quantity < item.available_quantity) {
        item.quantity += 1;
      }
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
    setProductsOnStorage(cartProducts);
  }

  render() {
    const { cartProducts } = this.state;
    const { history: { goBack, push } } = this.props;
    return (
      <>
        <header>
          <div className="name" onClick={ () => push('/') }>
            <ShoppingBasketIcon style={ { color: '#2FC18C', fontSize: '4rem' } } />
            <div>
              <span>FRONT-END</span>
              <span>online store</span>
            </div>
          </div>
          <Link to="/cart">
            <IconButton data-testid="shopping-cart-button" style={ { color: 'white' } }>
              <ShoppingCart style={ { fontSize: '3rem' } } />
            </IconButton>
          </Link>
        </header>
        <section>
          <button onClick={ () => goBack() } className="button-goback">
            <ReplyIcon style={ { color: '#2FC18C', fontSize: '2rem' } } />
            <span>Voltar</span>
          </button>
          <div className="carrinho">
            <p>Carrinho de Compras</p>
            {
              cartProducts.length === 0 ? (
                <p data-testid="shopping-cart-empty-message">
                  Seu carrinho está vazio
                </p>
              ) : (
                cartProducts.map((product) => (
                  <article key={ product.id }>
                    <hr />
                    <img
                      src={ product.thumbnail }
                      alt={ product.name }
                    />
                    <p data-testid="shopping-cart-product-name">{ product.title }</p>
                    <div className="operations">
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
                    </div>
                    <p>{ `R$ ${product.price}` }</p>
                  </article>
                ))
              )
            }
            <Link to="/checkout" data-testid="checkout-products">
              <button className="btn-add-to-cart small">
                <span>Finalizar Compras</span>
                <ShoppingCartCheckoutIcon />
              </button>
            </Link>
          </div>
        </section>
      </>
    );
  }
}

Cart.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
    push: PropTypes.func,
  }).isRequired,
};

export default Cart;
