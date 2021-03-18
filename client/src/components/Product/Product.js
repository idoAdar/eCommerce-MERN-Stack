import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

// Boostrap & Styling:
import { Card } from 'react-bootstrap';

const Product = ({ product }) => {
    return (
        <Card className={"card"}>
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant="top"/>
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="div">
                    <Rating value={product.rating} reviews={product.numReviews}/>
                    <h3>{product.price} $</h3>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product;