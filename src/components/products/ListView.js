import React, {useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import {CartContext} from '../contexts/useCart'
import {useDispatch, useSelector} from 'react-redux'

export default function ListView(){
    const products = useSelector(state=> state.app.products)
    const dispatch = useDispatch()
    // que me entrga el custo hook?
    let cart = useContext(CartContext)

    useEffect(()=>{
        dispatch({type: "GET_PRODUCTS",payload:{name:'ojito'}})
    }, [dispatch])

    function addItem(product){
        cart.addItemToCart(product)
    }

    return (
        <div style={{display:"flex", justifyContent:"space-around", flexWrap:"wrap"}}>
            {products.map(p=>
            <p>
                <img width="100" src={p.pics[0]} alt="" />
                <br/>
                <Link to={`/${p._id}`}>{p.title} - ${p.price}MXN</Link>
                <br/>
                <button onClick={()=>{
                    addItem(p)
                }}> 
                    Add to cart
                </button>
            </p>
            )}
        </div>
    )
}