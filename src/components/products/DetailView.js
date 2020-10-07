import React, { useEffect, useState } from 'react';
import noImage from '../../no-image.png';
import styles from './products.module.css'

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
        <div className={`card text-center ${styles.detailsContainer}`}>
            <div className="card-header">
                Detalles del producto
            </div>
            <div className="card-body">
                <img className={`card-img-top ${styles.cardImg}`} src={product.pics[0] || noImage} alt="..." />
                <p className="card-text">{product.title || 'Sin titulo'} - {product.price || 'Precio no disponible'}</p>
                <a href="/" className="btn btn-primary">Volver al catalogo</a>
            </div>
            <div className="card-footer text-muted">
                {product.body}
            </div>
        </div>
    );
}