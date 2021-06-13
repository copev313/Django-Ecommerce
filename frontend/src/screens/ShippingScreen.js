import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../actions/cartActions';


function ShippingScreen({ history }) {
    const cart = useSelector( state => state.cart )
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch( saveShippingAddress({address, city, postalCode, country}) )
        history.push('/payment')
    }


    return (
        <FormContainer>
            <h2 id="shipping-screen-title">Shipping</h2>
            <Form onSubmit={submitHandler}>

                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="123 Mulberry Street"
                        className=""
                        value={ address ? address : '' }
                        onChange={ (e) => setAddress(e.target.value) }
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Orlando, FL"
                        className=""
                        value={ city ? city : '' }
                        onChange={ (e) => setCity(e.target.value) }
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="postalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="32819"
                        className=""
                        value={ postalCode ? postalCode : '' }
                        onChange={ (e) => setPostalCode(e.target.value) }
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="United States"
                        className=""
                        value={ country ? country : '' }
                        onChange={ (e) => setCountry(e.target.value) }
                    >
                    </Form.Control>
                </Form.Group>

                <Button
                    type='submit'
                    variant='primary'
                    className="mt-1 btn-info btn-lg"
                >
                    <span className="h6 font-weight-bold">Continue</span>
                </Button>

            </Form>
        </FormContainer>
    )
}


export default ShippingScreen;