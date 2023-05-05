import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import ReplyIcon from '@mui/icons-material/Reply';
import PaymentIcon from '@mui/icons-material/Payment';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { getProductsFromStorage } from '../services/localStorage';
import '../styles/Checkout.css';

class Checkout extends Component {
  state = {
    cartProducts: [],
    fullname: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    payment: '',
    invalidFields: false,
  };

  componentDidMount() {
    const cartProducts = getProductsFromStorage();
    this.setState({
      cartProducts,
    });
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { history: { push } } = this.props;
    const { fullname, email, cpf, phone, cep, address, payment } = this.state;
    if (fullname && email && cpf && phone && cep && address && payment) {
      localStorage.removeItem('cartProducts');
      this.setState({
        cartProducts: [],
        invalidFields: false,
      });
      push('/');
    } else {
      this.setState({
        invalidFields: true,
      });
    }
  };

  render() {
    const { history: { goBack, push } } = this.props;
    const {
      cartProducts,
      fullname,
      email,
      cpf,
      phone,
      cep,
      address,
      invalidFields,
    } = this.state;
    return (
      <div>
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
        <button onClick={ () => goBack() } className="button-goback">
          <ReplyIcon style={ { color: '#2FC18C', fontSize: '2rem' } } />
          <span>Voltar</span>
        </button>
        <div className="checkout-container">
          <section className="review-products">
            <h2>Revise seus Produtos</h2>
            {cartProducts.map((product) => (
              <article key={ product.id }>
                <img
                  src={ product.thumbnail }
                  alt={ product.name }
                />
                <p>{ product.title }</p>
                <div>
                  <p>{ `Quantidade: ${product.quantity}`}</p>
                  <p>{ `R$ ${product.price}` }</p>
                </div>
                <hr />
              </article>
            ))}
            <p>
              <strong>
                Total: R$
                {(cartProducts.reduce((acc, cur) => (acc + cur.price), 0)).toFixed(2)}
              </strong>
            </p>
          </section>
          <section className="client-data">
            <form>
              <h2>Informações do Comprador</h2>
              <input
                type="text"
                placeholder="Nome Completo"
                data-testid="checkout-fullname"
                onChange={ this.handleChange }
                value={ fullname }
                name="fullname"
              />
              <input
                type="email"
                placeholder="E-mail"
                data-testid="checkout-email"
                onChange={ this.handleChange }
                value={ email }
                name="email"

              />
              <input
                type="text"
                placeholder="CPF"
                data-testid="checkout-cpf"
                onChange={ this.handleChange }
                value={ cpf }
                name="cpf"
              />
              <input
                type="text"
                placeholder="Telefone"
                data-testid="checkout-phone"
                onChange={ this.handleChange }
                value={ phone }
                name="phone"
              />
              <input
                type="text"
                placeholder="CEP"
                data-testid="checkout-cep"
                onChange={ this.handleChange }
                value={ cep }
                name="cep"
              />
              <input
                type="text"
                placeholder="Endereço"
                data-testid="checkout-address"
                onChange={ this.handleChange }
                value={ address }
                name="address"
              />
            </form>
            <section className="payment">
              <h2>Método de Pagamento</h2>
              <span>
                Boleto:
              <label htmlFor="ticket">
                <input
                  type="radio"
                  name="payment"
                  id="ticket"
                  data-testid="ticket-payment"
                  onChange={ this.handleChange }
                  value="ticket"
                />
                <QrCode2Icon />
              </label>
              </span>
              <span>
                Cartão de Crédito:
                <label htmlFor="visa">
                  <input
                    type="radio"
                    name="payment"
                    id="visa"
                    data-testid="visa-payment"
                    onChange={ this.handleChange }
                    value="visa"
                  />
                  Visa
                  <PaymentIcon />
                </label>
                <label htmlFor="master">
                  <input
                    type="radio"
                    name="payment"
                    id="master"
                    data-testid="master-payment"
                    onChange={ this.handleChange }
                    value="master"
                  />
                  MasterCard
                  <PaymentIcon />
                </label>
                <label htmlFor="elo">
                  <input
                    type="radio"
                    name="payment"
                    id="elo"
                    data-testid="elo-payment"
                    onChange={ this.handleChange }
                    value="elo"
                  />
                  Elo
                  <PaymentIcon />
                </label>
              </span>
            </section>
            {invalidFields && <p data-testid="error-msg">Campos inválidos</p>}
            <button data-testid="checkout-btn" onClick={ this.handleClick } className="btn-add-to-cart small">Comprar</button>
          </section>
        </div>
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
    push: PropTypes.func,
  }).isRequired,
};

export default Checkout;
