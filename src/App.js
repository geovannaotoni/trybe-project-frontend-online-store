import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
// import HomeComponent from './components/Home';
// import CartComponent from './components/Cart';
// import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <Switch>
      {/* <Route exact path="/" component={ HomeComponent } />
      <Route exact path="/cart" component={ CartComponent } />
      <Route exact path="/productDetail/:id" component={ ProductDetail } />
      <Route exact path="/checkout" component={ Checkout } /> */}
      <Route exact path="/" component={ Home } />
      <Route exact path="/cart" component={ Cart } />
      <Route exact path="/productDetail/:id" component={ ProductDetail } />
      <Route exact path="/checkout" component={ Checkout } />
    </Switch>
  );
}

export default App;
