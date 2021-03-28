import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating.js'

function Product({ product }) {
    return (
        <Card className="my-3 p-3 rounded product-card">
            <a href={`/product/${product._id}`}>
                <Card.Img src={product.image}/>
            </a>

            <Card.Body>
                <a href={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong>
                            {product.name}
                        </strong>
                    </Card.Title>
                </a>

                <Card.Text>
                    <div className="my-1">
                        <Rating value={product.rating}
                                text={`${product.numReviews} reviews`}
                                color={'darkgreen'} 
                        />
                    </div>
                </Card.Text>

                <Card.Text className="price-space" as="h3">
                    ${product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product
