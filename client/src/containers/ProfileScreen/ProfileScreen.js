import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as userAction from '../../store/actions/userAction';
import * as cartAction from '../../store/actions/cartAction';
import Spinner from '../../components/UI/Spinner/Spinner';

// Boostrap & Styling:
import { Form, Button, Row, Col, Alert, ListGroup, ListGroupItem, Image, Container } from 'react-bootstrap';

const ProfileScreen = props => {
    const [formState, setFormState] = useState({
        name: props.user.user.name,
        email: props.user.user.email,
        password: '******',
        confirm: '******'
    })

    useEffect(() => {
        props.orders();
    }, [])

    const updateState = e => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const send = e => {
        e.preventDefault();
        if (formState.password === formState.confirm &&
            formState.password.length >= 6 && 
            formState.confirm.length >= 6 &&
            formState.name !== '') {
            props.spinner();
            return props.update(formState);
        }
        props.note();
    }

    return (
        <Container>
            <Form onSubmit={(e) => send(e)}>
                {!props.message ? null : (
                    <Alert variant="danger">
                        {props.message.message}
                    </Alert>
                )}
                <h1>Hello {props.user.user.name}</h1>
                <Row>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                onChange={(e) => updateState(e)}
                                value={formState.name}
                                name="name"
                                type="text" 
                                placeholder="Enter name" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                onChange={(e) => updateState(e)}
                                disabled={true}
                                value={formState.email}
                                name="email"
                                type="email" 
                                placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                onChange={(e) => updateState(e)}
                                value={formState.password}
                                name="password"
                                type="password" 
                                placeholder="Password must be at least 6 characters" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Confirm</Form.Label>
                            <Form.Control 
                                onChange={(e) => updateState(e)}
                                value={formState.confirm}
                                name="confirm"
                                type="password" 
                                placeholder="Please make sure to confirm your password" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Button variant="dark" type="submit">
                        Update
                    </Button>
                </Row>
                {props.isLoading ? <Spinner /> : null}
            </Form>
            <br/>
            <Row>
                <h1>Your Orders</h1>
                    {props.userOrders ? (
                        <ListGroup>
                        <Row>
                        {props.userOrders.map(order => {
                            return (
                                <ListGroupItem key={order._id}>
                                    <Row>
                                        <Col md={1}>
                                            {order.orderItems.map(ord => {
                                                return (
                                                    <div className={"row"}>
                                                        <Image src={ord.image} alt={ord.name} fluid rounded/>
                                                    </div>
                                                ) 
                                            })}
                                        </Col>
                                        <Col>
                                            <p>Purchase at:{order.paidAt}</p>
                                        </Col>
                                        <Col>
                                            <p>Cost: {order.totalPrice.toFixed(2)} $</p>
                                        </Col>
                                        <Col>
                                            <p>Send to: {order.shippingAddress.address}</p>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            )
                        })}
                        </Row>
                    </ListGroup>
                    ) : (<p>No Orders</p>)}    
            </Row>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.userInfo,
        userOrders: state.cartReducer.orders,
        message: state.userReducer.message,
        isLoading: state.userReducer.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        update: (data) => dispatch(userAction.updateProfile(data)),
        orders: () => dispatch(cartAction.fetchUserOrders()),
        note: () => dispatch(userAction.dropNoteUpdate()),
        spinner: () => dispatch(userAction.dropSpinner())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);