import React from 'react';
import { Link } from 'react-router-dom';
import CardProductShopping from '../components/CardProductShopping';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      itens: [],
    };
  }

  componentDidMount() {
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', []);
    }
    if (localStorage.getItem('cart').length > 0) {
      const cartItens = JSON.parse(localStorage.getItem('cart'));
      this.setState({
        itens: cartItens,
      });
    }
  }

  updateComponent = () => {
    const cartItens = JSON.parse(localStorage.getItem('cart'));
    this.setState({
      itens: cartItens,
    });
  };

  render() {
    const { itens } = this.state;
    return (
      <div>
        <div>
          {
            (itens.length > 0)
              ? (
                itens.map((item) => (
                  <CardProductShopping
                    key={ item.id }
                    item={ item }
                    updateComponent={ this.updateComponent }
                  />
                ))
              )
              : (<p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>)
          }
        </div>
        <div>
          <Link
            data-testid="checkout-products"
            to="/checkout"
          >
            Finalizar compra
          </Link>
        </div>
      </div>
    );
  }
}

export default ShoppingCart;
