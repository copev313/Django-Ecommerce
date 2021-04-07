/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import Rating from '../components/Rating'

import axios from 'axios'


function ProductScreen({ match }) {

    const [product, setProduct] = useState([])

    useEffect(() => {
        async function fetchProduct() {
            const { data } = await axios.get(`/api/products/${match.params.id}`)
            setProduct(data)
        }

        fetchProduct()

    }, [])

    return (
        <div>
            <Link to="/" className="btn btn-dark my-4">
                Go Back
            </Link>

            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>

                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={product.rating}
                                    text={`${product.numReviews}`}
                                    color={"darkgreen"}
                            />
                        </ListGroup.Item>

                        {/* Didn't see the point in having the price listed twice.
                        <ListGroup.Item>
                            <ins>Price</ins>: ${product.price}
                        </ListGroup.Item>
                        */}

                        <ListGroup.Item>
                            <ins id="description-title">Description</ins>: 
                            <br></br>
                            {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        {(product.countInStock > 0) ? 
                                            "In Stock" : "Out of Stock"
                                        }
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button className={`btn-block btn-lg 
                                                    ${(product.countInStock === 0) ?
                                                        'btn-secondary' : 'btn-info'}`
                                                }
                                        disabled={product.countInStock === 0}
                                        type="button">
                                    ADD TO CART
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ProductScreen
