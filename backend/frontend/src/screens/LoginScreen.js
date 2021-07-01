import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';


function LoginScreen({ location, history }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const { error, loading, userInfo } = userLogin

    useEffect( () => {
        // [CASE] User's already logged in:
        if(userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch( login(email, password) )
    }


    return (
        <FormContainer>
            <h2 className="mt-2" id="login-title">Sign In</h2>
            <br></br>

            {/* Handle ERROR MESSAGE and LOADER animation */}
            { error && <Message variant="danger">{ error }</Message> }
            { loading && <Loader /> }

            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="boutsacado@mockup.com"
                        value={ email }
                        onChange={ (e) => setEmail(e.target.value) }
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="secrets . . ."
                        value={ password }
                        onChange={ (e) => setPassword(e.target.value) }
                    >
                    </Form.Control>
                </Form.Group>

                <Row>
                    <Button 
                        type="submit"
                        variant="info"
                        className="btn btn-info ml-3 mt-2 px-3"
                        id="login-button"
                    >
                        <span className="h6">
                            <strong>Login</strong>
                        </span>
                    </Button>

                    <Col className="text-right pt-3 mr-3">
                        New around these parts? 
                        <Link 
                            className="text-success pl-1"
                            to={ redirect ? `/register?redirect=${redirect}` :
                                            "/register" }>
                            <ins><strong>Register!</strong></ins>
                        </Link>
                    </Col>
                </Row>
            </Form>

        </FormContainer>
    )
}


export default LoginScreen;
