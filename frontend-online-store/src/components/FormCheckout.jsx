import React from 'react';
import { Redirect } from 'react-router-dom';
import '../style/FormCheckout.css';

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
      <div className="form-checkout">
        <form className="row g-3">
          <legend className="legend-checkout">Informações do Comprador</legend>
          <div className="col-md-6">
            <label className="form-label checkout-textbold" htmlFor="checkout-fullname">
              Nome Completo
            </label>
            <input
              placeholder="Nome"
              className="form-control"
              id="checkout-fullname"
              data-testid="checkout-fullname"
              type="text"
              name="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </div>
          <div className="col-md-6">
            <label className="form-label checkout-textbold" htmlFor="checkout-email">
              Email
            </label>
            <input
              placeholder="Email"
              className="form-control"
              id="checkout-email"
              data-testid="checkout-email"
              type="text"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </div>
          <div className="col-md-4">
            <label className="form-label checkout-textbold" htmlFor="checkout-cpf">
              CPF
            </label>
            <input
              placeholder="Somente numeração"
              className="form-control"
              id="checkout-cpf"
              data-testid="checkout-cpf"
              type="text"
              name="cpf"
              value={ cpf }
              onChange={ this.handleChange }
            />
          </div>
          <div className="col-md-4">
            <label className="form-label checkout-textbold" htmlFor="checkout-phone">
              Telefone
            </label>
            <input
              placeholder="Telefone"
              className="form-control"
              id="checkout-phone"
              data-testid="checkout-phone"
              type="text"
              name="phone"
              value={ phone }
              onChange={ this.handleChange }
            />
          </div>
          <div className="col-md-4">
            <label className="form-label checkout-textbold" htmlFor="checkout-cep">
              CEP
            </label>
            <input
              placeholder="CEP"
              className="form-control"
              id="checkout-cep"
              data-testid="checkout-cep"
              type="text"
              name="cep"
              value={ cep }
              onChange={ this.handleChange }
            />
          </div>
          <div className="col-md-12">
            <label className="form-label checkout-textbold" htmlFor="checkout-address">
              Endereço
            </label>
            <input
              placeholder="Endereço"
              className="form-control"
              id="checkout-address"
              data-testid="checkout-address"
              type="text"
              name="address"
              value={ address }
              onChange={ this.handleChange }
            />
          </div>
        </form>
        <form>
          <legend className="legend-checkout">Método de Pagamento</legend>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              id="ticket-payment"
              data-testid="ticket-payment"
              type="radio"
              name="payment"
              value="boleto"
              onChange={ this.handleChange }
            />
            <label className="form-check-label checkout-textbold" htmlFor="ticket-payment">
              Boleto
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              id="visa-payment"
              data-testid="visa-payment"
              type="radio"
              name="payment"
              value="visa"
              onChange={ this.handleChange }
            />
            <label className="form-check-label checkout-textbold" htmlFor="visa-payment">
              Visa
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              id="master-payment"
              data-testid="master-payment"
              type="radio"
              name="payment"
              value="mastercard"
              onChange={ this.handleChange }
            />
            <label className="form-check-label checkout-textbold" htmlFor="master-payment">
              MasterCard
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              id="elo-payment"
              data-testid="elo-payment"
              type="radio"
              name="payment"
              value="elo"
              onChange={ this.handleChange }
            />
            <label className="form-check-label checkout-textbold" htmlFor="elo-payment">
              Elo
            </label>
          </div>
        </form>
        <button
          className="btn btn-outline-light btn-submit-form"
          data-testid="checkout-btn"
          type="button"
          onClick={ this.onClick }
        >
          Comprar
        </button>
        {
          errorMsg ? (
            <p className="checkout-error" data-testid="error-msg">Campos inválidos</p>
          ) : null
        }
        { succeeded ? (<Redirect to="/" />) : ('') }
      </div>
    );
  }
}

export default FormCheckout;
