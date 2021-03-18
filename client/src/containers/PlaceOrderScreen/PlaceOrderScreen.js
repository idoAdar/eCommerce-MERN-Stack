import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import * as cartAction from '../../store/actions/cartAction';
import { withRouter } from 'react-router-dom';
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps';
import Spinner from '../../components/UI/Spinner/Spinner';

// Boostrap & Styling:
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap';

const PlaceOrderScreen = props => {
    const [spinner, setSpinner] = useState(false);
    const sum = props.cart.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
    const shippingTax = sum / 10;
    const total = sum + shippingTax;

    const send = e => {
        e.preventDefault();
        setSpinner(true);
        const newOrder = {
            orderItems: props.cart,
            shippingAddress: props.shipping,
            paymentMethod: props.payment,
            shippingPrice: shippingTax,
            totalPrice: sum + shippingTax
        }
        props.create(newOrder, props.history);
    }

    return (
        <Fragment>
            <CheckoutSteps step1={true} step2={true} step3={true}/>
            <Row>
                <Col md={8}>                 
                    <h3 className={"margin_tb"}>Shipping To:</h3>
                    <p>
                        {props.shipping.address},
                        {props.shipping.city}, 
                        {props.shipping.country}, 
                        {props.shipping.postalCode}
                    </p>
                    <h3 className={"margin_tb"}>Payment Method:</h3>
                    <strong>{props.payment}</strong>
                    <h3 className={"margin_tb"}>Order Items:</h3>
                    {props.cart.length === 0 ? <p>Empty Cart</p> : (
                        <ListGroup variant="flush">
                            {props.cart.map((item, index) => {
                                return (
                                    <Row key={index} className={"margin_tb"}>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.name} className={"small_img"} />
                                        </Col>
                                        <Col>
                                            <p>{item.name}</p>
                                        </Col>
                                        <Col>
                                            <p>Total Price: X{item.quantity} {item.price}$</p>
                                        </Col>
                                    </Row>
                                )
                            })}
                        </ListGroup>
                    )}          
                </Col>
                <Col md={4}>
                    <Card className="orderSummaryCard">
                        <ListGroup variant="flush">
                            <ListGroupItem>
                                <h3>Order Summary</h3>
                            </ListGroupItem>
                            <ListGroupItem>
                                Shipping Tax: {shippingTax.toFixed(2)}$ (10%)
                            </ListGroupItem>
                            <ListGroupItem>
                                Sum: {total.toFixed(2)}$
                            </ListGroupItem>
                            <ListGroupItem>
                                <Button
                                onClick={(e) => send(e)}
                                className={'btn-block'}
                                variant="success"
                                disabled={props.cart.length === 0 ? true : false}
                                >Order Now!</Button>
                            </ListGroupItem>
                                {spinner ? (
                                <ListGroupItem>
                                    <Spinner />
                                </ListGroupItem>
                                ) : null}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        shipping: state.cartReducer.shippingAddress,
        payment: state.cartReducer.paymentMethod,
        cart: state.userReducer.userInfo.user.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        create: (data, history) => dispatch(cartAction.createOrder(data, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PlaceOrderScreen));