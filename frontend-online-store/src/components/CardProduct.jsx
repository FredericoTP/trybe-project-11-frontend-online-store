import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
      <div data-testid="product">
        <img src={ thumbnail } alt={ title } />
        <p>{ title }</p>
        <p>
          R$
          {' '}
          { price }
        </p>
        {
          shipping ? (
            <p data-testid="free-shipping">Frete Grátis</p>
          ) : null
        }
        <Link
          data-testid="product-detail-link"
          to={ `/productdetails/${id}` }
        >
          Detalhes
        </Link>
        <button
          data-testid="product-add-to-cart"
          type="button"
          onClick={ this.onClick }
        >
          Adicionar ao Carrinho
        </button>
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
