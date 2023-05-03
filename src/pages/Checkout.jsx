import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import PaymentIcon from '@mui/icons-material/Payment';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import { getProductsFromStorage } from '../services/localStorage';

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
    const { history: { goBack } } = this.props;
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
        <IconButton onClick={ () => goBack() }>
          <ReplyIcon />
        </IconButton>
        <section>
          <h2>Revise seus Produtos</h2>
          {cartProducts.map((product) => (
            <article key={ product.id }>
              <p>{ product.title }</p>
              <p>{ `Quantidade: ${product.quantity}`}</p>
              <p>{ `R$ ${product.price}` }</p>
            </article>
          ))}
          <p>
            <strong>
              Total: R$
              {cartProducts.reduce((acc, cur) => (acc + cur.price), 0)}
            </strong>
          </p>
        </section>
        <section>
          <h2>Informações do Comprador</h2>
          <form>
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
        </section>
        <section>
          <h2>Método de Pagamento</h2>
          <input
            type="radio"
            name="payment"
            id="ticket"
            data-testid="ticket-payment"
            onChange={ this.handleChange }
            value="ticket"
          />
          <label htmlFor="ticket">
            Boleto
            <QrCode2Icon />
          </label>
          <span>
            Cartão de Crédito:
            <input
              type="radio"
              name="payment"
              id="visa"
              data-testid="visa-payment"
              onChange={ this.handleChange }
              value="visa"
            />
            <label htmlFor="visa">
              Visa
              <PaymentIcon />
            </label>
            <input
              type="radio"
              name="payment"
              id="master"
              data-testid="master-payment"
              onChange={ this.handleChange }
              value="master"
            />
            <label htmlFor="master">
              MasterCard
              <PaymentIcon />
            </label>
            <input
              type="radio"
              name="payment"
              id="elo"
              data-testid="elo-payment"
              onChange={ this.handleChange }
              value="elo"
            />
            <label htmlFor="elo">
              Elo
              <PaymentIcon />
            </label>
          </span>
        </section>
        {invalidFields && <p data-testid="error-msg">Campos inválidos</p>}
        <button data-testid="checkout-btn" onClick={ this.handleClick }>Comprar</button>
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
