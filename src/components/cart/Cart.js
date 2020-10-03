import React, {Fragment, useEffect, useContext} from 'react'
import styles from './cart.module.css'
import CartRow from './CartRow'
import {useDispatch, useSelector} from 'react-redux'


export default function Cart({show=false, onCancel}){

    const state = useSelector(state=> state.app)
    const items = state.selectedItems
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
                {Object.keys(items).length ? (Object.keys(items).map(productId=><CartRow key={productId} product={items[productId]} {...items[productId]} /> )) : 'no items added'}
                <p style={{fontSize:50,color:"white"}}>  {state.total}</p>
            </div>

        </Fragment>
    )
}