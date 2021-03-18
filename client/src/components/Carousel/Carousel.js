import React from 'react';
import { connect } from 'react-redux';
import { Carousel, Container, Row, Col } from 'react-bootstrap';

const Carousels = props => {
    return (
        <Container>
            <Row>  
                <Col md={12}>
                    <Carousel className={"carousel"}>
                        {props.products.map(product => {
                            return (
                            <Carousel.Item key={product._id}>
                                <h3>{product.name}</h3>
                                <img
                                    className="d-block img_medium"
                                    src={product.image}
                                    alt="First slide"
                                />
                                <p>{product.description}</p>
                            </Carousel.Item>
                            )
                        })}
                    </Carousel>
                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        products: state.productsReducer.products
    }
}

export default connect(mapStateToProps, null)(Carousels);