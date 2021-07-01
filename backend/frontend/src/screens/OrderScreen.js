import React, { useState, useEffect } from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalButton } from 'react-paypal-button-v2';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants';

function OrderScreen({ history, match }) {

    const orderId= match.params.id
    const dispatch = useDispatch()

    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector( state => state.orderDetails )
    const {order, error, loading} = orderDetails

    const orderPay = useSelector( state => state.orderPay )
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector( state => state.orderDeliver )
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector( state => state.userLogin )
    const { userInfo } = userLogin


    // [CASE] NOT loading and NOT error:
    if(!loading && !error) {
        order.itemsPrice = order.orderItems.reduce( 
            (acc, item) => acc + (item.price * item.qty), 0 ).toFixed(2)
    }

    // Adds the PayPal script necessary to integrate the PayPal button.
    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = "https://www.paypal.com/sdk/js?client-id=AZmhBuAaXSjA7ufZ56cb19aAvmcMBlgm71bQ05-JmP0V-39A4bn-S0GyI4RlIwxiaP9jqryTks-BTra7"
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }

        document.body.appendChild(script)
    }

    const formatTimestamp = (timestamp) => {
        const date = timestamp.substring(0, 10)
        const [year, month, day] = [date.substring(0, 4), date.substring(5,7), date.substring(8, 10)]
        const dateFormatted = `${month}-${day}-${year}`
        const time = timestamp.substring(11, 19)
        const hours = Number(time.substring(0,2))
        const hoursFormatted = (hours > 12) ? hours - 12 : hours
        const timeFormatted = `${hoursFormatted}${time.substring(2)}`
        return `${dateFormatted} @ ${timeFormatted} ${ (hours > 12) ? 'PM' : 'AM'} (UTC)`
    }


    useEffect( () => {
        // [CASE] User is NOT logged in:
        if(!userInfo) {
            history.push('/login')
        }
        // [CASE] No order OR order id does not match:
        if(!order || successPay || order._id !== Number(orderId) || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch( getOrderDetails(orderId) )
        } 
        else if(!order.isPaid) {
            if(!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, history, order, orderId, successPay, successDeliver, userInfo])


    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }

    const deliverHandler = () => {
        // Confirmation Message:
        if (window.confirm("Are you sure you want to mark this order as delivered?")) {
            dispatch( deliverOrder(order) )
        }
    }

    const zeroPadding = (num) => ('00000'+num).slice(-5)


    return  loading ? (
        <Loader />
    ) : 
    error ? (
        <Message variant="danger">{ error }</Message>
    ) : 
    (
        <div>
            <h2 id="ordersummary-screen-title">Order Invoice [#{ zeroPadding(orderId) }]</h2>

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
                                            <Message variant="success"><strong>Delivered</strong> on { formatTimestamp(order.deliveredAt) }</Message>
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
                                        <Message variant="success"><strong>Paid</strong> on { formatTimestamp(order.paidAt) }</Message>
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
                                        <Col>${order.itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping:</Col>
                                        <Col>{ (order.shippingPrice > 0) ?
                                                '$'+ order.shippingPrice : (
                                                    <span className="custom-lime">
                                                        <strong>FREE</strong>
                                                    </span>
                                            )}
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

                                
                                { !order.isPaid && (
                                    <ListGroup.Item className="mt-3">
                                        { loadingPay && <Loader /> }

                                        { !sdkReady ? (
                                            <Loader />
                                        ) : (   
                                                <PayPalButton 
                                                    amount={order.totalPrice}
                                                    onSuccess={successPaymentHandler}
                                                />
                                            )}
                                    </ListGroup.Item>
                                )}

                            </ListGroup>

                            { loadingDeliver && <Loader/> }

                            { userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button
                                        type="button"
                                        variant="warning"
                                        className="btn btn-block py-3"
                                        onClick={ deliverHandler }
                                    >
                                        <span className="h5" style={{ fontWeight: "500" }}>
                                            Mark as Delivered{' '}
                                            <i class="fas fa-shipping-fast"></i>
                                        </span>
                                    </Button>
                                </ListGroup.Item>
                            )}


                        </Card>
                    </Col>
                </Row>
            </div>
    )
}


export default OrderScreen;
