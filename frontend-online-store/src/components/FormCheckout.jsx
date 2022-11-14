import React from 'react';
import { Redirect } from 'react-router-dom';

class FormCheckout extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
      payment: '',
      errorMsg: false,
      succeeded: false,
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, () => {
      if (this.verification()) {
        this.setState({ errorMsg: false });
      }
    });
  };

  onClick = () => {
    if (this.verification()) {
      localStorage.removeItem('cart');
      this.setState({ succeeded: true });
    } else {
      this.setState({ errorMsg: true });
    }
  };

  verification = () => {
    const { name, email, cpf, phone, cep, address, payment } = this.state;
    const validRegexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const validRegexPhone = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}-?[0-9]{4}$/;
    const validRegexCpf = /^\d{3}\d{3}\d{3}\d{2}$/;
    const validRegexCep = /^[0-9]{5}?-?[0-9]{3}$/;

    return (
      name.length > 0
      && validRegexEmail.test(email)
      && validRegexCpf.test(cpf)
      && validRegexPhone.test(phone)
      && validRegexCep.test(cep)
      && address.length > 0
      && payment !== ''
    );
  };

  render() {
    const { name, email, cpf, phone, cep, address, errorMsg, succeeded } = this.state;
    return (
      <div>
        <fieldset>
          <legend>Informações do Comprador</legend>
          <label htmlFor="checkout-fullname">
            Nome Completo
            <input
              id="checkout-fullname"
              data-testid="checkout-fullname"
              type="text"
              name="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="checkout-email">
            Email
            <input
              id="checkout-email"
              data-testid="checkout-email"
              type="text"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="checkout-cpf">
            CPF
            <input
              id="checkout-cpf"
              data-testid="checkout-cpf"
              type="text"
              name="cpf"
              value={ cpf }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="checkout-phone">
            Telefone
            <input
              id="checkout-phone"
              data-testid="checkout-phone"
              type="text"
              name="phone"
              value={ phone }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="checkout-cep">
            CEP
            <input
              id="checkout-cep"
              data-testid="checkout-cep"
              type="text"
              name="cep"
              value={ cep }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="checkout-address">
            Endereço
            <input
              id="checkout-address"
              data-testid="checkout-address"
              type="text"
              name="address"
              value={ address }
              onChange={ this.handleChange }
            />
          </label>
        </fieldset>
        <fieldset>
          <legend>Método de Pagamento</legend>
          <label htmlFor="ticket-payment">
            <input
              id="ticket-payment"
              data-testid="ticket-payment"
              type="radio"
              name="payment"
              value="boleto"
              onChange={ this.handleChange }
            />
            Boleto
          </label>
          <label htmlFor="visa-payment">
            <input
              id="visa-payment"
              data-testid="visa-payment"
              type="radio"
              name="payment"
              value="visa"
              onChange={ this.handleChange }
            />
            Visa
          </label>
          <label htmlFor="master-payment">
            <input
              id="master-payment"
              data-testid="master-payment"
              type="radio"
              name="payment"
              value="mastercard"
              onChange={ this.handleChange }
            />
            MasterCard
          </label>
          <label htmlFor="elo-payment">
            <input
              id="elo-payment"
              data-testid="elo-payment"
              type="radio"
              name="payment"
              value="elo"
              onChange={ this.handleChange }
            />
            Elo
          </label>
        </fieldset>
        <button
          data-testid="checkout-btn"
          type="button"
          onClick={ this.onClick }
        >
          Comprar
        </button>
        {
          errorMsg ? (
            <p data-testid="error-msg">Campos inválidos</p>
          ) : null
        }
        { succeeded ? (<Redirect to="/" />) : ('') }
      </div>
    );
  }
}

export default FormCheckout;
