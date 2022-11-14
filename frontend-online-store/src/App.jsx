import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import './App.css'

function App() {
  return (
    <Switch>
      <Route exact path="/checkout" component={ Checkout } />
      <Route exact path="/productdetails/:id" component={ ProductDetails } />
      <Route exact path="/shoppingcart" component={ ShoppingCart } />
      <Route exact path="/" component={ Home } />
    </Switch>
  );
}

export default App;
