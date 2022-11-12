import React from 'react';
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

  render() {
    const { itens } = this.state;
    return (
      <div>
        {
          (itens.length > 0)
            ? (
              itens.map((item) => <CardProductShopping key={ item.id } item={ item } />)
            )
            : (<p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>)
        }
      </div>
    );
  }
}

export default ShoppingCart;
