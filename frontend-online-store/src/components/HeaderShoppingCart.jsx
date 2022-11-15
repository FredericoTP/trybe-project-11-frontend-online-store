import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../style/HeaderDetails.css';
import cartImage from '../images/cart-shopping.png'

class HeaderShoppingCart extends React.Component {
  render() {
    const { count } = this.props;
    return (
      <header className="header-details-component">
        <div className="header-details-title-container">
          <h1 className="header-details-title">Online Store</h1>
        </div>
        <div className="header-detail-home">
          <Link
            className="btn btn-outline-secondary header-detail-link"
            to="/"
          >
            Buscar Produto
          </Link>
        </div>
        <div className="header-details-h3">
          <h3>Carrinho de Compras</h3>
        </div>
        <div className="header-details-cart-container">
          <Link
            className="cart-link-header-detail"
            to="/shoppingcart"
            data-testid="shopping-cart-button"
          >
            <img src={ cartImage } alt="carrinho" />
            <p
              className="number-cart-itens-details"
              data-testid="shopping-cart-size"
            >
              { count }
            </p>
          </Link>
        </div>
      </header>
    );
  }
}

HeaderShoppingCart.propTypes = {
  count: PropTypes.number.isRequired,
};

export default HeaderShoppingCart;
