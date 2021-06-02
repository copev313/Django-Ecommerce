import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating.js';
import { Link } from 'react-router-dom';

function Product({ product }) {
    return (
        <Card className="my-3 p-3 rounded shadow-sm product-card">
            <Link to={`/product/${ product._id }`}>
                <Card.Img 
                    src={ product.image } 
                    className="rounded-3"
                />
            </Link>

            <Card.Body>
                <Link to={ `/product/${ product._id }` }>
                    <Card.Title 
                        as="div"
                        className="product-title"
                        id="product-card-title"
                    >
                        <strong>
                            { product.name }
                        </strong>
                    </Card.Title>
                </Link>

                <Card.Text>
                    <div className="my-1">
                        <Rating value={ product.rating }
                                text={ `${ product.numReviews } reviews` }
                                color={ "darkgreen" } 
                        />
                    </div>
                </Card.Text>

                <Card.Text className="price-space" as="h3">
                    ${ product.price }
                </Card.Text>
            </Card.Body>
        </Card>
    )
}


export default Product;
