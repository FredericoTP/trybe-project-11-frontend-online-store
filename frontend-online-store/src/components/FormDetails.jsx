import React from 'react';
import PropTypes from 'prop-types';
import '../style/FormDetails.css';

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
      <div className="form-ratings" key={ `${e.email}${i}` }>
        <h4 className="form-ratings-textbold" data-testid="review-card-email">{e.email}</h4>
        <p className="form-ratings-textbold" data-testid="review-card-rating">Avaliação:{ ' ' }{e.rating}</p>
        <p className="form-ratings-textbold" data-testid="review-card-evaluation">{e.text}</p>
      </div>
    ));

    return cards;
  }

  render() {
    const { email, comment, errorCheck, comentarios } = this.state;
    return (
      <div className="form-details">
        <div className="form-details-content">
          <h4 className="form-details-textbold">Faça sua avaliação do produto:</h4>
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label form-details-textbold">
              Email:
            </label>
            <input
              className="form-control"
              placeholder="email"
              type="text"
              name="email"
              value={ email }
              data-testid="product-detail-email"
              onChange={ this.handleChange }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputComment" className="form-label form-details-textbold">
              Mensagem:
            </label>
            <textarea
              className="form-control form-details-textarea"
              placeholder="Mensagem"
              name="comment"
              value={ comment }
              data-testid="product-detail-evaluation"
              onChange={ this.handleChange }
            />
          </div>
          <h5 className="form-details-textbold">
              Como você avalia o Produto?
          </h5>
          <div className="form-details-radio">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="rate"
                value="1"
                id="nota1"
                data-testid="1-rating"
                onChange={ this.handleChange }
              />
              <label htmlFor="nota1" className="form-check-label form-details-textbold">
                1
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="rate"
                value="2"
                id="nota2"
                data-testid="2-rating"
                onChange={ this.handleChange }
              />
              <label htmlFor="nota2" className="form-check-label form-details-textbold">
                2
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="rate"
                value="3"
                id="nota3"
                data-testid="3-rating"
                onChange={ this.handleChange }
              />
              <label htmlFor="nota3" className="form-check-label form-details-textbold">
                3
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="rate"
                value="4"
                id="nota4"
                data-testid="4-rating"
                onChange={ this.handleChange }
              />
              <label htmlFor="nota4" className="form-check-label form-details-textbold">
                4
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="rate"
                value="5"
                id="nota5"
                data-testid="5-rating"
                onChange={ this.handleChange }
              />
              <label htmlFor="nota5" className="form-check-label form-details-textbold">
                5
              </label>
            </div>
          </div>
          <button
            className="btn btn-outline-light btn-submit-form"
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.submitButton }
          >
            Enviar
          </button>
          { (errorCheck)
            ? (<span className="span-form" data-testid="error-msg">Campos inválidos</span>) : ('')
          }
          <div className="form-coments">
            {
              (comentarios.length > 0) 
              ? (<div>
                <h4 className="form-details-textbold">Avaliações:</h4>
                {this.criacaoComentarios()}
              </div>) : ('')
            }
          </div>
        </div>
      </div>
    );
  }
}

FormDetail.propTypes = {
  id: PropTypes.string.isRequired,
};

export default FormDetail;
