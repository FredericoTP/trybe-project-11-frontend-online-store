import React from 'react';
import PropTypes from 'prop-types';

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
              <div key={ id }>
                <img src={ thumbnail } alt={ title } />
                <p>{ title }</p>
                <p>
                  Preço unitário:
                  { ' ' }
                  R$
                  { ' ' }
                  { price }
                </p>
                <p>
                  Quantidade:
                  { ' ' }
                  { quantity }
                </p>
                <p>
                  Total do produto:
                  { ' ' }
                  R$
                  { ' ' }
                  {(price * quantity).toFixed(2)}
                </p>
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
