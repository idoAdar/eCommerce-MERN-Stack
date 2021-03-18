import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import * as userAction from '../../store/actions/userAction';
import { Link } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';

// Boostrap & Styling:
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';

const LoginScreen = props => {
    const [formState, setFormState] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        if (props.user) {
            props.history.push('/');
        }
    }, [props.history, props.user])

    const updateState = e => {
        e.preventDefault();
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const send = e => {
        e.preventDefault();
        if (formState.email !== '' &&
            formState.password !== '') {
            props.spinner();
            return props.login(formState); 
        }
        props.note();
    }

    return (
        <Fragment>
            <Form onSubmit={(e) => send(e)}>
                {!props.message ? null : (
                    <Alert variant="danger">
                        {props.message.message}
                    </Alert>
                )}
                <h1>Sign In</h1>
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        onChange={(e) => updateState(e)}
                        value={formState.email}
                        name="email"
                        type="email" 
                        placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        onChange={(e) => updateState(e)}
                        value={formState.password}
                        name="password"
                        type="password" 
                        placeholder="Password must be at least 6 characters" />
                </Form.Group>
                <Button variant="dark" type="submit">
                    Submit
                </Button>
                {props.isLoading ? <Spinner /> : null}
                <Row>
                    <Col>
                        <p className={'margin_tb'}>Don't Have Account? {<Link to="/register">Register</Link>}</p>
                    </Col>
                </Row>
            </Form>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        message: state.userReducer.message,
        user: state.userReducer.userInfo,
        isLoading: state.userReducer.isLoading 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (data) => dispatch(userAction.loginUser(data)),
        note: () => dispatch(userAction.dropNote()),
        spinner: () => dispatch(userAction.dropSpinner())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);