/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails } from '../actions/productActions'


function ProductScreen({ match, history }) {
    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return (
        <div>
            <Link to="/" className="btn btn-dark my-4">
                Go Back
            </Link>

            { loading ? <Loader />

            : error ? ( <Message variant="danger">
                            {error}
                        </Message>
            )

            : ( <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>

                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3 class="fw-bold">{product.name}</h3>
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

                                {/* Custom Quantity Dropdown based on number of items in the stores inventory */}
                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Quantity:</Col>
                                            <Col xs="auto" className="my-1">
                                                <Form.Control
                                                    as="select"
                                                    value={qty}
                                                    onChange={(e) => setQty(e.target.value)}
                                                >
                                                    {
                                                        [...Array(product.countInStock).keys()].map((x) => (
                                                            <option key={ x + 1 }  value={ x + 1 }>
                                                                { x + 1 }
                                                            </option>
                                                        ))
                                                    }
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}

                                <ListGroup.Item>
                                    <Button className={`btn-block btn-lg 
                                                        ${(product.countInStock === 0) ?
                                                            'btn-secondary' : 'btn-info'}`
                                                    }
                                            disabled={product.countInStock === 0}
                                            type="button"
                                            onClick={addToCartHandler}
                                    >
                                        ADD TO CART
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
        </div>
    )
}

export default ProductScreen
