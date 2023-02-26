import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './HeroHeader.scss';

const HeroHeader = () => {
  return (
    <Row>
        <Col>
            <h1 className="heading text-center">Quotes App</h1>
        </Col>
    </Row>
  );
};

export default HeroHeader;