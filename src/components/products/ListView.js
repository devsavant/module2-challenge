import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

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
        <div style={{display:"flex", justifyContent:"space-around", flexWrap:"wrap"}}>
            {products.map(p =>
            <p className="card" style={{width: "10rem"}}>
                <img className="card-img-top" src={p.pics[0]} alt="..." />
                <div className="card-body">
                    <Link className="card-title" to={`/${p._id}`}>{p.title} - ${p.price}MXN</Link>
                    {/*<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>*/}
                    <button className="btn btn-primary" onClick={()=>{
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