import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../style/CardProduct.css'
import free from '../images/free.png'

class CardProduct extends React.Component {
  onClick = () => {
    const {
      id,
      price,
      thumbnail,
      title,
      countItens,
      availableQuantity,
    } = this.props;
    const cart = { id, price, thumbnail, title, quantity: 1, availableQuantity };
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([cart]));
    } else {
      const cartItens = JSON.parse(localStorage.getItem('cart'));
      if (!(cartItens.some((item) => item.id === id))) {
        const cartAdd = [...cartItens, cart];
        localStorage.setItem('cart', JSON.stringify(cartAdd));
      }
    }
    countItens();
  };

  render() {
    const { id, price, thumbnail, title, shipping } = this.props;
    return (
      <div data-testid="product" className="card product-container">
        <img
          className="card-img-top product-image"
          src={ thumbnail }
          alt={ title }
        />
        <div className="card-body name-price">
          <p className="text-name-product-bold">{ title }</p>
          <div className="price-free-shipping">
            <p className="text-name-product">
              R$
              {' '}
              { price }
            </p>
            {
              shipping ? (
                <img
                  className="img-free-shipping"
                  src={ free }
                  alt="frete grátis"
                  data-testid="free-shipping"
                />
              ) : null
            }
          </div>
        </div>
        <div className="card-body product-btns">
          <Link
            className="btn btn-outline-dark"
            data-testid="product-detail-link"
            to={ `/productdetails/${id}` }
          >
            Detalhes
          </Link>
          <button
            className="btn btn-outline-dark"
            data-testid="product-add-to-cart"
            type="button"
            onClick={ this.onClick }
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    );
  }
}

CardProduct.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  countItens: PropTypes.func.isRequired,
  availableQuantity: PropTypes.number.isRequired,
  shipping: PropTypes.bool.isRequired,
};

export default CardProduct;
