import React from 'react'
import styles from './cart.module.css'

export default ({product, title, body="No description", price, pics=[], quantity=1, _id, changeQuantity, deleteItem})=>{

    return (
        <div className={styles.rowContainer}>
            <div>
                <img src={pics[0]} alt="blissito" />
            </div>
            <div >
                <span>
                    {title}
                </span>
                <span>
                    {body.slice(0,20)}...
                </span>
                <div>
                    <button onClick={()=>{
                        changeQuantity(product, false)
                    }}>
                        -
                    </button>
                    <input value={quantity} type="number" readOnly={true}/>
                    <button onClick={()=>{
                        changeQuantity(product)
                    }} >
                        +
                    </button>
                </div>
            </div>
            <div>
                <span
                onClick={()=>{
                    deleteItem(product)
                }}
                >x</span>
                <span>$ {price * product.quantity}.00</span>
            </div>
        </div>
    )
}