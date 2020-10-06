import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import noImage from '../../no-image.png'

export default function ListView() {
    const products = useSelector(state=> state.app.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'GET_PRODUCTS' });
    }, [dispatch]);

    function addItem(product) {
        dispatch({ type: 'ADD_ITEM', payload:product });
    }

    return (
        <div style={{display:"flex", justifyContent:"space-around", flexWrap:"wrap", padding: "50px"}}>
            {products.map(p =>
            <p className="card" style={{width: "10rem", margin:"10px"}}>
                <img className="card-img-top" style={{maxWidth: "200px", maxHeight: "200px"}}  src={p.pics[0] || noImage} alt="..." />
                <div className="card-body">
                    <Link className="card-title" to={`/${p._id}`}>{p.title || 'Sin titulo'}</Link>
                    <p style={{color: "black"}}>${p.price}MXN</p>
                    {/*<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>*/}
                    <button className="btn btn-primary" style={{bottom: "5px"}} onClick={()=>{
                        addItem(p)
                    }}>
                        Add to cart
                    </button>
                </div>
            </p>
            )}
        </div>
    );
}