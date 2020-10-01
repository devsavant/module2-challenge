import React, {Fragment, useEffect} from 'react'
import styles from './cart.module.css'
import CartRow from './CartRow'
import { useSelector, useDispatch} from 'react-redux';

export default function Cart({show=false, onCancel}){

    let cart = useSelector(state => state.products.productCart);
    const dispatch = useDispatch()

    function changeQuantity(product, increment=true){
        const found = cart.find(item => item._id === product._id)
        if(increment){
            found.quantity += 1
        }else{
            found.quantity -= 1  
            if(found.quantity <= 0){
                cart = cart.filter(item => item._id !== found._id)
            }
        }

        const newCart = cart.map(item => item._id === product._id ? found : item)
        dispatch({type: 'UPDATE_CART', payload: newCart})

       
    }

    function deleteItem(product){
        cart = cart.filter(item => item._id !== product._id)
        dispatch({type: 'UPDATE_CART', payload: cart})
    }

    useEffect(()=>{
        console.log("desde el carrito: ", cart)
    }, [cart])

    return (
        <Fragment>
            <div 
            onClick={onCancel}
            className={
                show ? styles.cartOverlay :
                `${styles.cartOverlay} ${styles.hidden2}`
            } ></div>
            <div className={
                show ? styles.cartHolder :
                `${styles.cartOverlay} ${styles.hidden}`
            } >
                {cart.map(p=><CartRow key={p._id} {...p} product={p} changeQuantity={changeQuantity} deleteItem={deleteItem}/>)}
            <p>Total: $ {cart.reduce((acc, current) => acc + (current.price * current.quantity), 0)}.00</p>
            </div>
        </Fragment>
    )
}