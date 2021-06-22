import React, { /*useState,*/ useEffect } from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants';


function PlaceOrderScreen({ history }) {

    const orderCreate = useSelector( state => state.orderCreate )
    const {order, error, success} = orderCreate

    const dispatch = useDispatch()

    const cart = useSelector( state => state.cart )

    cart.itemsPrice = cart.cartItems.reduce( 
        (acc, item) => acc + (item.price * item.qty), 0 ).toFixed(2)
    
    // Orders over $100 ship free. Orders under have $10 flat rate shipping.
    cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2)

    // Tax rate will vary, however Ohio sales tax is 5.75%.
    cart.taxPrice = Number((0.0575) * cart.itemsPrice).toFixed(2)

    // Order Totol:
    cart.totalPrice = ( Number(cart.itemsPrice) +
                        Number(cart.shippingPrice) +
                        Number(cart.taxPrice) ).toFixed(2)

    // Handle Missing Payment Method:
    if(!cart.paymentMethod && !localStorage.getItem("paymentMethod")) {
        history.push('/payment')
    }

    useEffect( () => {
        if(success) {
            history.push(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [dispatch, success, history])

    const placeOrder = () => {
        dispatch( 
            createOrder({
                orderItems:       cart.cartItems,
                shippingAddress:  cart.shippingAddress,
                paymentMethod:    cart.paymentMethod,
                itemsPrice:       cart.itemsPrice,
                shippingPrice:    cart.shippingPrice,
                taxPrice:         cart.taxPrice,
                totalPrice:       cart.totalPrice,
        }))
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <h2 id="placeorder-screen-title">Place Order</h2>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3 className="pb-2"><ins>Shipping</ins></h3>
                            <p>
                                <strong>Shipping Address: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}
                                {'  '}
                                {cart.shippingAddress.postalCode},
                                {'  '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item className="pt-4">
                            <h3 className="pb-2"><ins>Payment Method</ins></h3>
                            <p>
                                <strong>Method: </strong>
                                {cart.paymentMethod ||
                                 localStorage.getItem("paymentMethod").replace(/"/gi, '')}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item className="pt-4">
                            <h3 className="pb-2"><ins>Order Items</ins></h3>
                            {cart.cartItems.length === 0 ? (
                                <Message variant="secondary">
                                    Your cart is empty
                                </Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map( (item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid rounded
                                                    />
                                                </Col>

                                                <Col className="pt-3">
                                                    <Link 
                                                        to={`/product/${item.product}`}
                                                        className="custom-lime">
                                                        {item.name}
                                                    </Link>
                                                </Col>

                                                <Col md={4} className="pt-3">
                                                    ${item.price} x {item.qty} = ${(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2 id="order-summary-title">
                                    Order Summary
                                </h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Item(s):</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>{ (cart.shippingPrice > 0) ?
                                            '$'+ cart.shippingPrice : (
                                                <span   className="custom-lime">
                                                    <strong>FREE</strong>
                                                </span>
                                        )}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item className={ error ? "" : "invisible" }>
                                { error && <Message variant="danger">{ error }</Message> }
                            </ListGroup.Item>

                            <ListGroup.Item className="m-2">
                                <Button
                                    type="button"
                                    className="btn-block btn-success btn-lg"
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrder}
                                >
                                    <span className="h6 font-weight-bold">
                                        Place Order
                                    </span>
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}


export default PlaceOrderScreen;
