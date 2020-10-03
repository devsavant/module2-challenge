import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import Uploader from './components/Uploader' 
import Cart from './components/cart/Cart';
import Routes from './Routes';
import {useDispatch, useSelector} from 'react-redux'

// import {CartContext} from './components/contexts/useCart'


function App() {


  const state = useSelector(state=> state.app)
  const dispatch = useDispatch()

  function toggleShow(){
    if(state.showCart){
      dispatch({type: "HIDE_CART"})
    } else {
      dispatch({type: "SHOW_CART"})
    }
  }

  return (
    <div >

      <Routes />

    { <Cart
      onCancel={toggleShow}
      show={state.showCart}
      //list={state.selectedItems}
      /> }
    </div>
  );
}

export default App;

// 1.- Hacer bonito el loader
// 2.- agregar el numero o completado
// 3.- quitar el form cuando ya se está subiendo
// 4.- prevenir la salida del usuario si hay una tarea importante...
