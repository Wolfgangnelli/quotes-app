import React from 'react';
import { Navbar } from '../../molecules';
import { Container } from 'react-bootstrap';

const Header = () => {
  return (
      <Container as='header'>
        <Navbar />
      </Container>
  );
};

export default Header;