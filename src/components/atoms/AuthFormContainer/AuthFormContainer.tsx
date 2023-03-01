import React from "react";
import { Row, Col, Container } from "react-bootstrap";

interface Props {
  children: JSX.Element[]
}

const AuthFormContainer = (props: Props) => {

  const { children } = props;

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default AuthFormContainer;