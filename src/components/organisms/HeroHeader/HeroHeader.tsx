import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import './HeroHeader.scss';

const HeroHeader = () => {
  return (
      <Container className=' pt-5'>
        <Row>
            <Col>
                <h1 className="heading text-center">Quotes App</h1>
            </Col>
        </Row>
      </Container>
  );
};

export default HeroHeader;