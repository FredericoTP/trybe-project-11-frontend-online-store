import React from 'react';
import CheckoutProducts from '../components/CheckoutProducts';
import FormCheckout from '../components/FormCheckout';
import HeaderCheckout from '../components/HeaderCheckout';
import Footer from '../components/Footer';
import '../style/Checkout.css';

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItens: [],
      haveItens: false,
      total: 0,
      count: 0,
    };
  }

  componentDidMount() {
    const cart = localStorage.getItem('cart');
    if (cart === null) {
      localStorage.setItem('cart', []);
    }
    if (cart.length > 0) {
      let sum = 0;
      JSON.parse(cart).forEach((item) => {
        const { price, quantity } = item;
        const total = price * quantity;
        sum += total;
      });
      this.setState({
        haveItens: true,
        cartItens: JSON.parse(cart),
        total: sum,
      });
    }
    this.countItens();
  }

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

  render() {
    const { cartItens, haveItens, total, count } = this.state;
    return (
      <div className="checkout-container">
        <div>
          <HeaderCheckout count={ count } />
        </div>
        <div className="checkout-products-content">
          <CheckoutProducts
            cartItens={ cartItens }
            haveItens={ haveItens }
          />
          {
            total === 0 ? null : (
              <h3 className="total-value-checkout">
                Valor total da compra:
                { ' ' }
                R$
                { ' ' }
                { total.toFixed(2) }
              </h3>
            )
          }
        </div>
        <div>
          <FormCheckout />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Checkout;
