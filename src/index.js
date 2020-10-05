import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom'
import {CartProvider} from './components/contexts/useCart'
import generateStore from './redux/store'
import { Provider } from 'react-redux'

const store = generateStore()

const WithRedux = () => <Provider store={store}><App/></Provider>

ReactDOM.render(
  <BrowserRouter>
  <React.StrictMode>
    <CartProvider >
      <WithRedux />
    </CartProvider>
  </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
