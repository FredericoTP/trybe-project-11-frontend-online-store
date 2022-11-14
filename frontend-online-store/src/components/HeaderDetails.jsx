import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class HeaderDetails extends React.Component {
  render() {
    const { count } = this.props;
    return (
      <header>
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          Detalhes do Produto
        </div>
        <div>
          <Link
            to="/shoppingcart"
            data-testid="shopping-cart-button"
          >
            Carrinho
          </Link>
          <p data-testid="shopping-cart-size">{ count }</p>
        </div>
      </header>
    );
  }
}

HeaderDetails.propTypes = {
  count: PropTypes.number.isRequired,
};

export default HeaderDetails;
