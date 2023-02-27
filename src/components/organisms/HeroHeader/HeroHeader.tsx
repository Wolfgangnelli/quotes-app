import React from 'react';
import { Row, Col } from 'react-bootstrap';
//import heroImage from '../../../assets/images/hero_image.jpg';
import './HeroHeader.scss';

const HeroHeader = () => {
  return (
    <Row>
        <Col>
            <h1 className="heading text-center">Quotes App</h1>
            {/* <img src={heroImage} className='img-fluid' alt='hero' /> */}
        </Col>
    </Row>
  );
};

export default HeroHeader;