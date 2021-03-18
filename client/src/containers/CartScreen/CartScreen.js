import React from 'react';
import { connect } from 'react-redux';
import * as userAction from '../../store/actions/userAction';
import { Link } from 'react-router-dom';

// Boostrap & Styling:
import { Col, Row, ListGroup, ListGroupItem, Image, Button, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CartScreen = props => {
    const removeItem = (e, id) => {
        e.preventDefault();
        props.remove(id);
    }

    return (
        <Container>
            <Row>
                <Col lg={9} >
                    <h1>Shopping Cart</h1>
                    {props.cart.length === 0 ? <p>Empty Cart</p> : (
                        <ListGroup>
                            {props.cart.map(item => {
                                return (
                                    <ListGroupItem key={item._id}>
                                        <Row>
                                            <Col lg={3} md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.productId}`}>{item.name}</Link>
                                            </Col>
                                            <Col>
                                                <p>Sum: {item.price.toFixed(2)}$</p>
                                            </Col>
                                            <Col>
                                                <p>Quantity: X{item.quantity}</p>
                                            </Col>
                                            <Col>
                                                <Button onClick={(e) => removeItem(e, item._id)} variant="danger" size="sm">Remove</Button>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                )
                            })}
                        </ListGroup>
                    )}
                </Col>
                <Col lg={3} className={'checkout_container'}>
                    <ListGroup>
                        <ListGroupItem>
                            <p>
                                Subtotal: ({
                                    props.cart.reduce((acc, item) => acc + item.quantity, 0)
                                }) items
                            </p>
                            <p>
                                Total Price: {
                                    props.cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)
                                } $
                            </p>
                        </ListGroupItem>
                            <ListGroupItem>
                                <LinkContainer to={props.isAuth ? '/shipping' : '/login'}>
                                    <Button className={'btn-block'} 
                                    variant="success"
                                    disabled={props.cart.length === 0}
                                    >Checkout</Button>
                                </LinkContainer>
                        </ListGroupItem>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        cart: state.userReducer.userInfo.user.cart,
        isAuth: state.userReducer.isAuth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        remove: (id) => dispatch(userAction.deleteFromCart(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);