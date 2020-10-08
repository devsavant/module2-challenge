import React, {useState, useEffect} from 'react';
// import logo from './logo.svg';
import './App.css';
// import Uploader from './components/Uploader' 
import Cart from './components/cart/Cart';
import Routes from './Routes';
import { useSelector} from 'react-redux';

// TESTE TEST 
function App() {
  
  const cartState = useSelector(state => state.products.list);

  let [state, setState] = useState({
    show:false
  })
  let [list] = useState([])

  useEffect(()=>{
    if(!!cartState.length){
      setState({...state, show:true})
    }
  }, [])

  function toggleShow(){
    setState({...state, show: !state.show})
  }

  return (
    <div >
    <button onClick={toggleShow}>
      Blissito
    </button>

      <Routes />

    <Cart 
      onCancel={toggleShow}
      show={state.show} 
      list={list}
      />
    </div>
  );
}

export default App;

// 1.- Hacer bonito el loader
// 2.- agregar el numero o completado
// 3.- quitar el form cuando ya se está subiendo
// 4.- prevenir la salida del usuario si hay una tarea importante...
