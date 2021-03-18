import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux';
import * as userAction from '../../store/actions/userAction';
import { Link } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';

// Boostrap & Styling:
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';

const RegisterScreen = props => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
        confirm: ''
    })

    const updateState = e => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const send = e => {
        e.preventDefault();
        if (formState.name !== '' && 
            formState.email !== '' &&
            formState.email.includes('@') && 
            formState.password.length >= 6 && 
            formState.confirm.length >= 6 &&
            formState.password === formState.confirm) {
            props.spinner();
            return props.register(formState, props.history);
        }
        props.note();
    }

    return (
        <div>
            <Fragment>
            <Form onSubmit={(e) => send(e)}>
                {!props.message ? null : (
                    <Alert variant="danger">
                        {props.message.message}
                    </Alert>
                )}
                <h1>Register</h1>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        onChange={(e) => updateState(e)}
                        value={formState.name}
                        name="name"
                        type="text" 
                        placeholder="Enter your name" />
                </Form.Group>
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
                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        onChange={(e) => updateState(e)}
                        value={formState.confirm}
                        name="confirm"
                        type="password" 
                        placeholder="Please make sure to confirm your password" />
                </Form.Group>
                <Button variant="dark" type="submit">
                    Register
                </Button>
                {props.isLoading ? <Spinner /> : null}
                <Row>
                    <Col>
                        <p className={'margin_tb'}>Already Have Account? {<Link to="/login">Login</Link>}</p>
                    </Col>
                </Row>
            </Form>
        </Fragment>
        </div>
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
        register: (data, history) => dispatch(userAction.registerUser(data, history)),
        note: () => dispatch(userAction.dropNote()),
        spinner: () => dispatch(userAction.dropSpinner())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);