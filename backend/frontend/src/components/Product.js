import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating.js';
import { Link } from 'react-router-dom';


function Product({ product }) {

    return (
        <Card className="my-3 p-0 shadow-sm rounded-0 border">
            <Link to={`/product/${ product._id }`}>
                <Card.Img 
                    src={ product.image } 
                    className="p-0 rounded-0 border-bottom"
                />
            </Link>

            <Card.Body>
                <Link to={ `/product/${ product._id }` }  className="text-wrap">
                    <Card.Title 
                        as="div"
                        className="custom-lime text-wrap"
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
                                text={ (product.numReviews === 1) ? ( `${product.numReviews} review`
                                    ) : ( 
                                        `${product.numReviews} reviews`
                                    )}
                                color={ "darkgreen" } 
                        />
                    </div>
                </Card.Text>

                <Card.Text className="price-space border-top pl-1" as="h4">
                    ${ product.price }
                </Card.Text>
            </Card.Body>
        </Card>
    )
}


export default Product;
