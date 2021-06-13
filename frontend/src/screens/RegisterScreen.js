import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';


function RegisterScreen({ location, history }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const { error, loading, userInfo } = userRegister

    useEffect( () => {
        // [CASE] User's already logged in:
        if(userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase())
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if(password.length < 8) {
            setMessage("Password must contain at least 8 characters.")
        }
        // [CASE] Passwords DON'T match:
        else if(password !== confirmPassword) {
            setMessage("Passwords do not match!")
        }
        // [CASE] Passwords match:
        else {
            dispatch( register(name, email, password) )
        }
    }


    return (
        <FormContainer>
            <h2 className="mt-2" id="login-title">Sign In</h2>
            <br></br>
            {/* Handle Password Confirmation Message */}
            { message && <Message variant="danger">{ message }</Message>}

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
                        className={ (name.length >= 2) ?
                                "is-valid" : "is-invalid" }
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
                        required
                        type="password"
                        placeholder="Enter Password"
                        className={ password ? (
                                        password.length >= 8 ?
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
                        required
                        type="password"
                        placeholder="Confirm Password"
                        className={ (confirmPassword.length >= 8) ? (
                                        password === confirmPassword ? 
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
                        variant="info"
                        className="btn btn-info ml-3 mt-2 px-3"
                        id="register-button"
                    >
                        <span className="h6 font-weight-bold">Register</span>
                    </Button>
                </Row>
            </Form>

            <Row className="py-3">
                <Col>
                    Already a member? 
                    <Link 
                        className="text-success pl-1"
                        to={ redirect ? `/login?redirect=${redirect}` :
                                        "/login" }>
                        <ins>Sign in!</ins>
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}


export default RegisterScreen;
