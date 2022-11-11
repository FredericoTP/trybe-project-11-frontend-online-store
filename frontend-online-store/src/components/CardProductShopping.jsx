import React from 'react';
import PropTypes from 'prop-types';

class CardProductShopping extends React.Component {
  render() {
    const { item } = this.props;
    const { price, thumbnail, title, quantity } = item;

    return (
      <div>
        <img src={ thumbnail } alt={ title } />
        <p data-testid="shopping-cart-product-name">{ title }</p>
        <p data-testid="shopping-cart-product-quantity">{ quantity }</p>
        <p>
          R$
          { ' ' }
          { price }
        </p>
      </div>
    );
  }
}

CardProductShopping.propTypes = {
  item: PropTypes.shape({
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    quantity: PropTypes.number,
  }).isRequired,
};

export default CardProductShopping;
