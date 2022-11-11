import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardProduct extends React.Component {
  render() {
    const { id, price, thumbnail, title } = this.props;
    return (
      <div data-testid="product">
        <img src={ thumbnail } alt={ title } />
        <p>{ title }</p>
        <p>
          R$
          {' '}
          { price }
        </p>
        <Link
          data-testid="product-detail-link"
          to={ `/productdetails/${id}` }
        >
          Detalhes
        </Link>
      </div>
    );
  }
}

CardProduct.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default CardProduct;
