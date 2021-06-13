import React, { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';


function PaymentScreen({ history }) {
    const cart = useSelector( state => state.cart )
    const { shippingAddress } = cart

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()

    // Redirect the user if they don't have their shipping information:
    if(!shippingAddress.address) {
        history.push('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch( savePaymentMethod(paymentMethod) )
        history.push('/placeorder')
    }




    return (
        <FormContainer>
        
            <CheckoutSteps step1 step2 step3 />

            <h2 id="payment-screen-title"
                className="mb-4"
            >
                Payment Method
            </h2>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label className="mb-3">
                        <h5><ins>Select Method</ins>:</h5>
                    </Form.Label>
                    <Col>
                        <Form.Check
                            type="radio"
                            label="Paypal or Credit Card"
                            id="paypal"
                            name="paymentMethod"
                            checked
                            onChange={ (e) => setPaymentMethod(e.target.value)}
                        >
                        </Form.Check>
                    </Col>
                </Form.Group>

                <Button
                    type='submit'
                    variant='info'
                    className="mt-3 btn-info btn-lg"
                >
                    <span className="h6 font-weight-bold">Continue</span>
                </Button>
            </Form>




        </FormContainer>
    )
}


export default PaymentScreen;
