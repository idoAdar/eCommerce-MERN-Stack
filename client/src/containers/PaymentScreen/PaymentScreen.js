import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import * as cartAction from '../../store/actions/cartAction';
import { withRouter } from 'react-router-dom';
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps';

// Boostrap & Styling:
import { Form, Button, Col } from 'react-bootstrap';

const PaymentScreen = props => {
    const [paymentState, setPaymentState] = useState('PayPal');

    const send = e => {
        e.preventDefault();
        console.log(paymentState);
        props.savePaymentMethod(paymentState, props.history);
    }

    return (
        <Fragment>
            <CheckoutSteps step1={true} step2={true}/>
            <Form onSubmit={(e) => send(e)}>
                <h1 className="step">Payment</h1>
                <Form.Group>
                    <Form.Label>Select Method</Form.Label>
                    <Col>
                        <Form.Check type="radio" 
                            onChange={(e) => setPaymentState(e.target.value)} 
                            label="PayPal"
                            id="paypal"
                            checked
                            name="method" 
                            value="PayPal">
                        </Form.Check>
                        <Form.Check type="radio" 
                            onChange={(e) => setPaymentState(e.target.value)} 
                            label="Credit Card"
                            id="credit" 
                            name="method" 
                            value="Credit Card">
                        </Form.Check>
                    </Col>
                </Form.Group>
                <Button 
                    variant="dark" 
                    type="submit">
                    Next
                </Button>
            </Form>
        </Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        savePaymentMethod: (data, history) => dispatch(cartAction.paymentMethod(data, history))
    }
}

export default connect(null, mapDispatchToProps)(withRouter(PaymentScreen));