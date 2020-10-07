import React, { useEffect, useState } from 'react';
import noImage from '../../no-image.png';

export default function DetailView({match}){
    let [product, setProduct] = useState({ pics:[] });
    useEffect(()=>{
        fetch('https://backend-panel.herokuapp.com/products/' + match.params.id)
            .then(res=>res.json())
            .then(data=>{
                setProduct(data.result)
            });
    }, [match.params.id]);

    return (
        <div style={{display:"flex", justifyContent:"space-around", flexWrap:"wrap", padding: "50px"}} className="card text-center">
            <div className="card-header">
                DETAIL OF THE PRODUCT
            </div>
            <div className="card-body">
                {/*<h5 className="card-title">Special title treatment</h5>*/}
                <img className="card-img-top" style={{maxWidth: "200px", maxHeight: "200px"}} src={product.pics[0] || noImage} alt="..." />
                <p className="card-text">{product.title} - {product.price}</p>
                <a href="/" className="btn btn-primary">Back to catalog</a>
            </div>
            <div className="card-footer text-muted">
                {product.body}
            </div>
        </div>
    );
}