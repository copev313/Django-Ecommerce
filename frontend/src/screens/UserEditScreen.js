import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row } from 'react-bootstrap';
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
        if (!user.name || user._id !== Number(userId)) {
            dispatch( getUserDetails(userId) )
        } else {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [dispatch, user, userId ])

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase())
    }

    const submitHandler = (e) => {
        e.preventDefault()
        
    }


    return ( 
            <div>
                <Link to="/admin/userlist" className="btn btn-dark my-4">
                    Go Back
                </Link>

                <FormContainer>
                    <h2 className="m-0 p-0" id="edit-user-title">Edit User</h2>

                    { loading ? ( <Loader /> ) :
                        error ? ( <Message variant="danger">{ error }</Message> 
                    ) : (
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId="name" className="mt-4">
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

                                <Form.Group controlId="email" className="mt-4">
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

                                <Form.Group controlId="isadmin" className="m-0 p-0">
                                    <Form.Check
                                        className="ml-2 mt-4"
                                        type="checkbox"
                                        label="Is Admin"
                                        checked={ isAdmin }
                                        onChange={ (e) => setIsAdmin(e.target.value) }
                                    >
                                    </Form.Check>
                                </Form.Group>

                                <Row className="d-flex flex-row-reverse mr-2 mb-2">
                                    <Button 
                                        type="submit"
                                        variant="warning"
                                        className="btn ml-4 mt-2 px-3"
                                    >
                                        <span className="h6 font-weight-bold">Update</span>
                                    </Button>
                                </Row>
                            </Form>
                    )
                }
                </FormContainer>
            </div>
    )
}


export default EditUserScreen;
