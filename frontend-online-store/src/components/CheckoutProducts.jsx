import React from 'react';
import PropTypes from 'prop-types';
import '../style/CheckoutProducts.css'

class CheckoutProducts extends React.Component {
  render() {
    const { cartItens, haveItens } = this.props;
    if (!haveItens) {
      return (
        <p>Seu carrinho está vazio!</p>
      );
    }

    return (
      <>
        {
          cartItens.map((item) => {
            const { id, thumbnail, title, price, quantity } = item;
            return (
              <div className="check-product-container" key={ id }>
                <div className="check-product-title-image">
                  <img src={ thumbnail } alt={ title } />
                  <p className="check-product-title">{ title }</p>
                </div>
                <div className="check-product-price">
                  <p>
                    Preço unitário:
                    { ' ' }
                    R$
                    { ' ' }
                    { price.toFixed(2) }
                  </p>
                  <p>
                    Quantidade:
                    { ' ' }
                    { quantity }
                  </p>
                </div>
                <div className="check-product-totalprice">
                  <p>
                    Total do produto:
                    { ' ' }
                    R$
                    { ' ' }
                    {(price * quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })
        }
      </>
    );
  }
}

CheckoutProducts.propTypes = {
  cartItens: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  })).isRequired,
  haveItens: PropTypes.bool.isRequired,
};

export default CheckoutProducts;
