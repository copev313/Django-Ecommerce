import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';   
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';


function CartScreen({ match, location, history }) {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()

    const cart = useSelector( state => state.cart )
    const { cartItems } = cart

    useEffect( () => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty] )

    const continueShoppingHandler = () => {
        // Redirect to home page:
        history.push('/')
    }

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        // Redirect to shipping page:
        history.push("/login?redirect=shipping")
    }


    return (
        <Row>
            <Col md={8}>
                <h2 className="mt-2" id="shopping-cart-title">Shopping Cart</h2>
                <br></br>

                { (cartItems.length === 0) ? 
                    (
                        <Message variant="primary">
                            Your cart is empty.
                            <Link to="/"  className="pl-2">
                                Continue browsing
                            </Link>
                        </Message>
                )
                : (
                    <ListGroup variant="flush">
                        { cartItems.map((item) => (
                            <ListGroup.Item key={ item.product }>
                                <Row>
                                    <Col md={2}>
                                        <Image  
                                            src={ item.image }
                                            alt={ item.name }
                                            fluid
                                            rounded
                                        />
                                    </Col>

                                    <Col md={4}>
                                        <Link to={ `/product/${item.product}` }  className="product-title custom-lime">
                                            { item.name }
                                        </Link>
                                    </Col>

                                    <Col md={2}>
                                        ${ item.price }
                                    </Col>

                                    <Col md={2}>
                                        <Form.Control
                                            as="select"
                                            value={ item.qty }
                                            onChange={ (e) => dispatch(
                                                addToCart(item.product, Number(e.target.value))
                                            )}
                                        >
                                            {   [...Array(item.countInStock).keys()].map( (x) => (
                                                    <option key={ x + 1 }  value={ x + 1 }>
                                                        { x + 1 }
                                                    </option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>

                                    <Col md={1}>
                                        <Button 
                                            type="button"
                                            variant="outline-secondary"
                                            onClick={ () => removeFromCartHandler(item.product) }
                                        >
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}

                        <ListGroup.Item>
                            <Row className="mt-2">
                                <Col md={6}>
                                    <Button
                                        type="button"
                                        variant="outline-primary"
                                        class="btn btn-outline-primary px-3 py-2"
                                        onClick={ continueShoppingHandler }
                                    >
                                        <span id="continue-shopping-btn">
                                            <strong>Continue Shopping</strong>
                                        </span>
                                    </Button>
                                </Col>

                                <Col md={5}> </Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                )}
            </Col>

            <Col md={4}>
                <Card className="mt-3">
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>
                                Subtotal: {' '}
                                { cartItems.reduce(
                                    (acc, item) =>  acc + item.qty, 0 )
                                }
                                {' '} Item(s)
                            </h3>
                            <h4 className="mt-3 pl-1">
                                <strong>
                                ${ cartItems.reduce(
                                    (acc, item) =>  acc + item.qty * item.price, 0 ).toFixed(2)
                                }
                                </strong>
                            </h4>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button
                                type="button"
                                variant="info"
                                className="btn-block btn-info btn-lg"
                                disabled={ cartItems.length === 0 }
                                onClick={ checkoutHandler }
                            >
                                <span className="h6">
                                    <strong>Proceed To Checkout</strong>
                                </span>
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}


export default CartScreen;
