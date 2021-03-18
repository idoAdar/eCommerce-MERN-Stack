import React from 'react';

// Boostrap & Styling:
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        <p>- eCommerce ProShop -</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer;