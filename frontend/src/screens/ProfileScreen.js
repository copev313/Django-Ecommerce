import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';


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

    useEffect( () => {
        // [CASE] User's NOT logged in:
        if(!userInfo) {
            history.push('/login')
        }
        // [CASE] User's logged in:
        else {
            // [CASE] We have no user info loaded:
            if(!user || !user.name || success) {
                dispatch({
                    type: USER_UPDATE_PROFILE_RESET,
                })
                dispatch( getUserDetails('profile') )
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
        if(password.length < 8) {
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
                <h2 id="user-profile-title">User Profile</h2>

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
                            variant="secondary"
                            className="btn btn-secondary ml-3 mt-3 mb-5 px-4"
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

            <Col md={1}> </Col>

            <Col md={7}>
                <h2 id="my-orders-title">My Orders</h2>
            </Col>
        </Row>
    )
}


export default ProfileScreen;

