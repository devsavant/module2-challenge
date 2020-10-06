import React from 'react'
import styles from './cart.module.css'
import {useDispatch} from 'react-redux'
import noImage from '../../no-image.png'

export default ({product, price, title, body="No description",  pics=[], unitsAdded=1, _id})=>{

    const dispatch = useDispatch()

    function decreaseQuantity(product){
        dispatch({type: "SUBSTRACT_ITEM",payload:product})
    }

    function increaseQuantity(product){
        dispatch({type: "ADD_ITEM",payload:product})
    }

    function deleteItem(id){
        dispatch({type: "REMOVE_ITEM",payload:id})
    }

    return (
        <div className={styles.rowContainer}>
            <div>
                <img src={(pics[0]||noImage)} alt="..." />
            </div>
            <div >
                <span>
                    {title}
                </span>
                <span>
                    {body.slice(0,20)}...
                </span>
                <div style={{marginLeft: "20px"}}>
                    <button onClick={()=>{
                        decreaseQuantity(product)
                    }}>
                        -
                    </button>
                    <input value={unitsAdded} type="number"/>
                    <button onClick={()=>{
                        increaseQuantity(product)
                    }} >
                        +
                    </button>
                </div>
            </div>
            <div>
                <span
                onClick={()=>{
                    deleteItem(_id)
                }}
                >x</span>
                <span>$ {(price||0)*unitsAdded}.00</span>
            </div>
        </div>
    )
}