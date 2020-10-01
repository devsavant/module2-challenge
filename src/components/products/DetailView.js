import React from 'react'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'

export default function DetailView({match}){
    const cart = useSelector(state => state.products.list)
    const product = cart.find(item => item._id === match.params.id)
    const history = useHistory()
    return (
        <div>
            <img width="200" alt="img" src={product.pics.length ? product.pics[0] : 'https://image.shutterstock.com/image-photo/word-default-written-wooden-blocks-260nw-1015640596.jpg'} />
            DEtalle del producto: {product.title} - {product.price}
            <button onClick={()=>history.goBack()}>
                atrás
            </button>
        </div>
    )
}