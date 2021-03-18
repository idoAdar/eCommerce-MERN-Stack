import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as productsAction from '../../store/actions/productsAction';
import Product from '../../components/Product/Product';
import Carousel from '../../components/Carousel/Carousel';
import Spinner from '../../components/UI/Spinner/Spinner';

// Boostrap & Styling:
import { Row, Col, Container } from 'react-bootstrap';

const HomeScreen = props => {
    useEffect(() => {
        props.getAllProducts();
    }, []);

    return (
        <Container>
            <h1>List of Products</h1>
            {props.isLoading ? null : <Carousel />}
            {props.isLoading ? <Spinner /> : (
                <Row>
                    {props.products.map(product => {
                        return (
                            <Col key={product._id} sm={12} md={6} lg={4}>
                                <Product product={product} />
                            </Col>
                        )
                    })}
                </Row>
            )}
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        products: state.productsReducer.products,
        isLoading: state.productsReducer.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllProducts: () => dispatch(productsAction.getAll())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);