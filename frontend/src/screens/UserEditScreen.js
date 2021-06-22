import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { getUserDetails } from '../actions/userActions';


function EditUserScreen({ match, history }) {

    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    useEffect( () => {
        
    }, [])

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase())
    }

    const submitHandler = (e) => {
        e.preventDefault()
        
    }


    return (
        <FormContainer>
            <h2 className="mt-2" id="edit-user-title">Edit User</h2>

            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter Name"
                        className={ name ? (
                            name.length >= 2 ?
                                "is-valid" : "is-invalid") : "" }
                        value={ name }
                        onChange={ (e) => setName(e.target.value) }
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
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

                <Form.Group controlId="isadmin">
                    <Form.Check
                        type="checkbox"
                        label="Is Admin"
                        checked={ isAdmin }
                        onChange={ (e) => setIsAdmin(e.target.value) }
                    >
                    </Form.Check>
                    <Form.Control.Feedback type="invalid">
                        Required: Must be at least 8 characters long.
                    </Form.Control.Feedback>
                </Form.Group>

                <Row>
                    <Button 
                        type="submit"
                        variant="info"
                        className="btn btn-info ml-4 mt-2 px-3"
                        id="register-button"
                    >
                        <span className="h6 font-weight-bold">Update</span>
                    </Button>
                </Row>
            </Form>
        </FormContainer>
    )
}


export default EditUserScreen;
