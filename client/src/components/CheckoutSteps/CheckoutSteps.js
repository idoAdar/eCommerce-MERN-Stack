import React, { Fragment } from 'react';

// Boostrap & Styling:
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = props => {
    return (
        <Fragment>
            <Nav variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    {props.step1 ? (
                        <LinkContainer to="/shipping">
                            <Nav.Link>Shipping</Nav.Link>
                        </LinkContainer>
                    ) : (
                        <Nav.Link disabled>Shipping</Nav.Link>
                    )}
                </Nav.Item>
                <Nav.Item>
                    {props.step2 ? (
                        <LinkContainer to="/payment">
                            <Nav.Link>Payment</Nav.Link>
                        </LinkContainer>
                    ) : (
                        <Nav.Link disabled>Payment</Nav.Link>
                    )}
                </Nav.Item>
                <Nav.Item>
                    {props.step3 ? (
                        <LinkContainer to="palce_order">
                            <Nav.Link>Place Order</Nav.Link>
                        </LinkContainer>
                    ) : (
                        <Nav.Link disabled>Place Order</Nav.Link>
                    )}
                </Nav.Item>
            </Nav>
        </Fragment>
    )
}

export default CheckoutSteps;