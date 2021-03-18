import React from 'react';
import { connect } from 'react-redux';
import * as userAction from '../../store/actions/userAction';
import { withRouter } from 'react-router-dom';

// Boostrap & Styling:
import { Container, Navbar, Nav, NavDropdown, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = props => {
    const logoutHandler = () => {
        props.history.push('/');
        props.logout();
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <LinkContainer to="/" exact>
                    <Navbar.Brand>ProShop</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {props.user ? (
                            <LinkContainer to="/cart">
                            <Nav.Link>
                                <i className="fas fa-shopping-cart"></i> Cart
                            </Nav.Link>
                        </LinkContainer>
                        ) : null}
                        {props.user ? (
                        <NavDropdown title={props.user.user.name} id="username">
                            <LinkContainer to="/profile">
                                <Dropdown.Item>Profile</Dropdown.Item>
                            </LinkContainer>
                            <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
                        </NavDropdown>
                        ) : (
                            <LinkContainer to="/login">
                            <Nav.Link>
                                <i className="fas fa-user"></i> Sign in
                            </Nav.Link>
                        </LinkContainer>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </header>
    )
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.userInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(userAction.logoutUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));