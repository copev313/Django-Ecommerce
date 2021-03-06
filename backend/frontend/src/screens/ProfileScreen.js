import React, { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Alert, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { listMyOrders } from '../actions/orderActions';


function ProfileScreen({ history }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [alertVariant, setAlertVariant] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading:loadingOrders, error:errorOrders, orders } = orderListMy

    useEffect( () => {
        // [CASE] User's NOT logged in:
        if (!userInfo) {
            history.push('/login')
        }
        // [CASE] User's logged in:
        else {
            // [CASE] We have no user info loaded OR 
            //          we're viewing details of a different user's account:
            if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch( getUserDetails('profile') )
                dispatch( listMyOrders() )
            }
            // [CASE] User's info is already loaded:
            else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase())
    }

    const submitHandler = (e) => {
        e.preventDefault()
        // [CASE] Password Doesn't Meet Length Requirement:
        if(password && password.length < 8) {
            setAlertVariant("danger")
            setMessage("Password must contain at least 8 characters!")
        }
        // [CASE] Passwords DON'T match:
        else if(password !== confirmPassword) {
            setAlertVariant("danger")
            setMessage("Passwords do not match!")
        }
        // [CASE] Passwords match:
        else {
            dispatch( updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password,
            }))
            setAlertVariant("success")
            setMessage("Profile Updated")
        }
    }


    return (
        <Row>
            <Col md={4}>
                <h2 id="user-profile-title">
                    <ins>User Profile</ins>
                </h2>

                {/* Handle Password Confirmation Message & Successful Profile Updates*/}
                { message && alertVariant === 'danger' && 
                    <Alert variant={ alertVariant } onClose={() => setMessage('')} dismissible>{ message }</Alert>
                }

                {/* Handle ERROR MESSAGE and LOADER animation */}
                { error && <Message variant="danger">{ error }</Message> }
                { loading && <Loader /> }

                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type="name"
                            placeholder="Enter Name"
                            className={ name ? (
                                (name.length >= 2) ?
                                    "is-valid" : "is-invalid") : "" }
                            value={ name }
                            onChange={ (e) => setName(e.target.value) }
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Enter Email"
                            className={ email ? (
                                            validateEmail(email) ?
                                                "is-valid" : "is-invalid") : "" }
                            value={ email }
                            onChange={ (e) => setEmail(e.target.value) }
                        >
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Must provide a valid email address.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            className={ password ? (
                                            (password.length >= 8) ?
                                                "is-valid" : "is-invalid") : "" }
                            value={ password }
                            onChange={ (e) => setPassword(e.target.value) }
                        >
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Required: Must be at least 8 characters long.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="passwordConfirm">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            className={ (confirmPassword.length >= 8) ? (
                                            (password === confirmPassword) ? 
                                                "is-valid" : "is-invalid") : "" }
                            value={ confirmPassword }
                            onChange={ (e) => setConfirmPassword(e.target.value) }
                        >
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Required: Must match password field.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Row>
                        <Button 
                            type="submit"
                            variant="outline-dark"
                            className="btn ml-3 mt-3 mb-5 px-4"
                            id="update-btn"
                        >
                            <span className="h6">
                                <strong>Update</strong>
                            </span>
                        </Button>
                    </Row>
                </Form>
                <Row></Row>
                { message && alertVariant === 'success' && 
                    <Alert variant={ alertVariant } onClose={() => setMessage('')} dismissible>{ message }</Alert>
                }
            </Col>

            <Col md={1}></Col>

            <Col md={7}>
                <h2 id="my-orders-title">
                    <ins>My Orders</ins>
                </h2>

                { loadingOrders ? ( <Loader /> ) : 
                    errorOrders ? (
                        <Message variant="danger">{ errorOrders }</Message>
                    ) : (
                        <Table striped responsive className="table-sm">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Paid</th>
                                    <th>Delivered</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                { orders.map( order => (
                                    <tr key={ order._id } >
                                        <td className="pt-2 pl-2">{ order._id }</td>
                                        <td className="pt-2">{ order.createdAt.substring(0, 10) }</td>
                                        <td className="pt-2">${ order.totalPrice }</td>
                                        <td className="pt-2">{ order.isPaid ? order.paidAt.substring(0, 10) : (
                                            <i  className="fas fa-times pl-2" style={{ color: 'red' }}></i>
                                        )}
                                        </td>
                                        <td className="pt-2">
                                            { order.isDelivered ? order.deliveredAt.substring(0, 10) :
                                                <em className="text-muted">Not Delivered</em>
                                            }
                                        </td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button className="btn-sm" variant="outline-dark">
                                                    Details
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )
                }
            </Col>
        </Row>
    )
}


export default ProfileScreen;

