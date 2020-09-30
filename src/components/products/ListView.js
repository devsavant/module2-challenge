import React, {useEffect, useState, useContext} from 'react'
import {Link} from 'react-router-dom'
import {CartContext} from '../contexts/useCart'
import { useSelector, useDispatch} from 'react-redux';
import { fetchProduct } from '../../redux/productsDuck';

export default function ListView(){
   
    const dispatch = useDispatch();
    const product = useSelector(state => state.products.list);
    
    let cart = useContext(CartContext)

    useEffect(()=>{
        dispatch(fetchProduct());
    }, [dispatch]);

    function addItem(product){
        cart.addItemToCart(product)
    }

    return (
        <div style={{display:"flex", justifyContent:"space-around", flexWrap:"wrap"}}>
            {products.map(p=>
            <p>
                <img width="100" src={p.pics[0]} />
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
