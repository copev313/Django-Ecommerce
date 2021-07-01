import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';


function UserEditScreen({ match, history }) {

    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [message, setMessage] = useState('')
    const [alertVariant, setAlertVariant] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate} = userUpdate

    useEffect( () => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            /*history.push('/admin/userlist/')*/
        }
        else {
            if (!user.name || user._id !== Number(userId)) {
                dispatch( getUserDetails(userId) )
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

    }, [dispatch, user, userId, successUpdate, history])

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase())
    }

    const submitHandler = (e) => {
        e.preventDefault()
        // [CASE] Password Doesn't Meet Length Requirement:
        if (password && password.length < 8) {
            setAlertVariant("danger")
            setMessage("Password must contain at least 8 characters!")
        }
        // [CASE] Passwords DON'T match:
        else if(password !== confirmPassword) {
            setAlertVariant("danger")
            setMessage("Passwords do not match!")
        }
        // [CASE] Passwords match or DNE:
        else {
            // Confirmation Message:
            if (window.confirm("Are you sure you want to update this user's account information?")) {
                dispatch( updateUser({
                    _id: user._id,
                    name,
                    email,
                    isAdmin,
                    password
                }))
                setAlertVariant("success")
                setMessage("Account Updated")
            } 
        }
    }


    return ( 
            <div>
                <Link to="/admin/userlist" className="btn btn-dark mt-3">
                    Go Back
                </Link>

                <FormContainer>
                    {/* Handle Error Messages & Successful Updates*/}
                    { message &&
                        <Alert variant={ alertVariant } onClose={() => setMessage('')} dismissible>{ message }</Alert>
                    }

                    <h2 className="m-0 p-0" id="edit-user-title">Edit User</h2>

                    { loadingUpdate && ( <Loader /> )}
                    { errorUpdate && <Message variant="danger">{ errorUpdate }</Message>}

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

                                <Form.Group controlId="email" className="my-4">
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

                                <hr></hr>

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

                                <Form.Group controlId="isadmin" className="mt-5 p-0">
                                <Form.Label>Account Roles</Form.Label>
                                    <Form.Check
                                        className="ml-4 mt-2"
                                        type="switch"
                                        label="ADMIN"
                                        checked={ isAdmin }
                                        onChange={ () => setIsAdmin(!isAdmin) }
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


export default UserEditScreen;
