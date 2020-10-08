import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux';
import { fetchProduct } from '../../redux/productsDuck';

export default function ListView(){
   
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.list);
    const cart = useSelector(state => state.products.productCart);

    useEffect(()=>{
        dispatch(fetchProduct());
    }, [dispatch]);

    function addItem(product){
        const found = cart.find(item => item._id === product._id)
        if(!found){
            product.quantity = 1
            dispatch({type: 'ADD_ITEM_TO_CART', payload:product })
        }else{
            found.quantity += 1
            const newCart = cart.map(item => item._id === product._id ? found : item)
            dispatch({type: 'UPDATE_CART', payload: newCart})
            //aumentar cantidad
        }
    }

    return (
        <div style={{display:"flex", justifyContent:"space-around", flexWrap:"wrap"}}>
            {products.map(p=>
            <p key={p._id}>
                <img width="100" alt="img" src={p.pics.length ? p.pics[0] : 'https://image.shutterstock.com/image-photo/word-default-written-wooden-blocks-260nw-1015640596.jpg'} />
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
