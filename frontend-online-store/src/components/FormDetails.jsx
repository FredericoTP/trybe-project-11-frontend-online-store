import React from 'react';
import PropTypes from 'prop-types';

class FormDetail extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      comment: '',
      rate: '',
      errorCheck: false,
      comentarios: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitButton = this.submitButton.bind(this);
    this.verification = this.verification.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.criacaoComentarios = this.criacaoComentarios.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;
    const locStor = localStorage.getItem(id);

    if (locStor != null) {
      const array = JSON.parse(locStor);
      this.setState({ comentarios: array });
    }
  }

  handleChange({ target }) {
    const valor = target.value;
    const nome = target.name;

    this.setState({ [nome]: valor }, () => {
      if (this.verification()) {
        this.setState({ errorCheck: false });
      }
    });
  }

  verification() {
    const { email, rate } = this.state;
    const bool = ((rate !== '') && this.validateEmail(email));

    return bool;
  }

  validateEmail(email) {
    const validRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    return (validRegex.test(email));
  }

  submitButton() {
    const { email, comment, rate, comentarios } = this.state;
    const { id } = this.props;

    if (this.verification()) {
      const obj = { email, text: comment, rating: rate };
      const aux = comentarios;
      aux.push(obj);
      localStorage.setItem(id, JSON.stringify(aux));
      this.setState({ email: '', comment: '', comentarios: aux });
    } else {
      this.setState({ errorCheck: true });
    }
  }

  criacaoComentarios() {
    const { comentarios } = this.state;

    const cards = comentarios.map((e, i) => (
      <div key={ `${e.email}${i}` }>
        <h4 data-testid="review-card-email">{e.email}</h4>
        <p data-testid="review-card-rating">{e.rating}</p>
        <p data-testid="review-card-evaluation">{e.text}</p>
      </div>
    ));

    return cards;
  }

  render() {
    const { email, comment, errorCheck, comentarios } = this.state;
    return (
      <div>
        <label htmlFor="inputEmail">
          Email:
          <input
            type="text"
            name="email"
            value={ email }
            data-testid="product-detail-email"
            onChange={ this.handleChange }
          />
          <br />
        </label>
        <label htmlFor="inputComment">
          Mensagem:
          <textarea
            name="comment"
            value={ comment }
            data-testid="product-detail-evaluation"
            onChange={ this.handleChange }
          />
        </label>
        <p>
          Como você avalia o Produto?
        </p>
        <label htmlFor="nota1">
          <input
            type="radio"
            name="rate"
            value="1"
            id="nota1"
            data-testid="1-rating"
            onChange={ this.handleChange }
          />
          1
        </label>
        <label htmlFor="nota2">
          <input
            type="radio"
            name="rate"
            value="2"
            id="nota2"
            data-testid="2-rating"
            onChange={ this.handleChange }
          />
          2
        </label>
        <label htmlFor="nota3">
          <input
            type="radio"
            name="rate"
            value="3"
            id="nota3"
            data-testid="3-rating"
            onChange={ this.handleChange }
          />
          3
        </label>
        <label htmlFor="nota4">
          <input
            type="radio"
            name="rate"
            value="4"
            id="nota4"
            data-testid="4-rating"
            onChange={ this.handleChange }
          />
          4
        </label>
        <label htmlFor="nota5">
          <input
            type="radio"
            name="rate"
            value="5"
            id="nota5"
            data-testid="5-rating"
            onChange={ this.handleChange }
          />
          5
          <br />
        </label>

        <button
          type="button"
          data-testid="submit-review-btn"
          onClick={ this.submitButton }
        >
          Submit
        </button>

        { (errorCheck)
          ? (<span data-testid="error-msg">Campos inválidos</span>) : ('') }

        {
          (comentarios.length > 0) ? (this.criacaoComentarios()) : ('')
        }
      </div>
    );
  }
}

FormDetail.propTypes = {
  id: PropTypes.string.isRequired,
};

export default FormDetail;
