import React from 'react';
import { Link } from 'react-router-dom';
import CardProductShopping from '../components/CardProductShopping';
import HeaderShoppingCart from '../components/HeaderShoppingCart';
import '../style/ShoppingCart.css'

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      itens: [],
      count: 0,
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
    this.countItens();
  }

  updateComponent = () => {
    const cartItens = JSON.parse(localStorage.getItem('cart'));
    this.setState({
      itens: cartItens,
    });
    this.countItens();
  };

  countItens = () => {
    const cart = localStorage.getItem('cart');
    if (cart && cart.length > 2) {
      let sum = 0;
      JSON.parse(cart).forEach((item) => {
        const { quantity } = item;
        sum += quantity;
        this.setState({
          count: sum,
        });
      });
    }
    if (cart.length === 2) {
      this.setState({
        count: 0,
      })
    }
  };

  countItensIncreaseDecrease = (string) => {
    const cart = localStorage.getItem('cart');
    if (cart && string === 'increase') {
      let sum = 0;
      JSON.parse(cart).forEach((item) => {
        const { quantity } = item;
        sum += quantity;
        this.setState({
          count: sum + 1,
        });
      });
    }
    if (cart && string === 'decrease') {
      let sum = 0;
      JSON.parse(cart).forEach((item) => {
        const { quantity } = item;
        sum += quantity;
        this.setState({
          count: sum - 1,
        });
      });
    }
  };  

  render() {
    const { itens, count } = this.state;
    return (
      <div className="cart-container">
        <HeaderShoppingCart count={ count } />
        <div className="cart-product-container">
          {
            (itens.length > 0)
              ? (
                itens.map((item) => (
                  <CardProductShopping
                    key={ item.id }
                    item={ item }
                    updateComponent={ this.updateComponent }
                    countItensIncreaseDecrease={ this.countItensIncreaseDecrease }
                  />
                ))
              )
              : (<h2
                  className="shopping-cart-empty-message"
                  data-testid="shopping-cart-empty-message">
                    Seu carrinho está vazio!
                  </h2>)
          }
        </div>
        <div className="shopping-checkout">
          {
            (itens.length > 0) 
              ? (
                <Link
                  className="btn btn-dark btn-shopping-checkout"
                  data-testid="checkout-products"
                  to="/checkout"
                >
                  Finalizar compra
                </Link>
              ) 
              : (
                <Link
                  className="btn btn-dark btn-shopping-checkout"
                  data-testid="checkout-products"
                  to="/"
                >
                  Buscar Produtos
                </Link>
              )
          }
        </div>
      </div>
    );
  }
}

export default ShoppingCart;
