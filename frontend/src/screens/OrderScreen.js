import React, { useState, useEffect } from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails } from '../actions/orderActions';


function OrderScreen({ match }) {

    const orderId= match.params.id
    const dispatch = useDispatch()
    
    const orderDetails = useSelector( state => state.orderDetails )
    const {order, error, loading} = orderDetails

    // [CASE] NOT loading and NOT error:
    if(!loading && !error) {
        order.itemsPrice = order.orderItems.reduce( 
            (acc, item) => acc + (item.price * item.qty), 0 ).toFixed(2)
    }

    useEffect( () => {
        // [CASE] No order OR order id does not match:
        if(!order || order._id !== Number(orderId)) {
            dispatch(getOrderDetails(orderId))
        }

    }, [dispatch, order, orderId])


    return  loading ? (
        <Loader />
    ) : 
    error ? (
        <Message variant="danger">{ error }</Message>
    ) : 
    (
        <div>
            <h2 id="ordersummary-screen-title">Order Invoice -- # {orderId}</h2>

                <Row>
                    <Col md={8}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3 className="pb-2">
                                    <ins>Shipping</ins>
                                </h3>
                                <p><strong>Name: </strong> 
                                    <span className="text-secondary">
                                    {order.user.name}
                                    </span>
                                </p>
                                <p><strong>Email: </strong> 
                                    <a  className="text-secondary"
                                        href={`mailto:${order.user.email}`}>
                                        {order.user.email}
                                    </a>
                                </p>

                                <p><strong>Shipping Address: </strong>
                                    <span className="text-secondary">
                                        {order.shippingAddress.address}, {order.shippingAddress.city}
                                        {'  '}
                                        {order.shippingAddress.postalCode},
                                        {'  '}
                                        {order.shippingAddress.country}
                                    </span>
                                    <p></p>
                                    { order.isDelivered ? (
                                            <Message variant="success"><strong>Delivered</strong> ({order.deliveredAt})</Message>
                                    ) : (
                                            <Message variant="secondary"><strong>Not Delivered</strong></Message>
                                    )}
                                </p>
                            </ListGroup.Item>

                            <ListGroup.Item className="pt-4">
                                <h3 className="pb-2"><ins>Payment Method</ins></h3>
                                <p><strong>Method: </strong> 
                                    <span className="text-secondary font-weight-bold">
                                        {order.paymentMethod ||
                                            localStorage.getItem("paymentMethod").replace(/"/gi, '')}
                                    </span>
                                </p>
                                { order.isPaid ? (
                                        <Message variant="success"><strong>Paid</strong> on {order.paidAt}</Message>
                                ) : (
                                        <Message variant="warning"><strong>Not Paid</strong></Message>
                                )}
                                <p>

                                </p>
                            </ListGroup.Item>

                            <ListGroup.Item className="pt-4">
                                <h3 className="pb-2"><ins>Order Items</ins></h3>
                                {order.orderItems.length === 0 ? (
                                    <Message variant="secondary">
                                        Order is empty
                                    </Message>
                                ) : (
                                    <ListGroup variant="flush">
                                        {order.orderItems.map( (item, index) => (
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
                                                            class="custom-lime">
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
                                        <Col>${order.itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping:</Col>
                                        <Col>{ (order.shippingPrice > 0) ?
                                                    '$'+ order.shippingPrice : (
                                                        <span   className="text-primary"
                                                                class="custom-lime">
                                                            <strong>FREE</strong>
                                                        </span>)
                                            }
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax:</Col>
                                        <Col>${order.taxPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total:</Col>
                                        <Col>${order.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </div>
    )
}


export default OrderScreen;
