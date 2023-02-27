import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { SearchBar } from '../../molecules';

interface Props {
    children: React.ReactNode
    title: string
    searchBar?: boolean
}

const SectionContainer = (props: Props) => {

    const {children, title, searchBar} = props;

  return (
    <Container as={'section'} className='py-4 my-2'>
        <Row>
            <Col xxl={searchBar ? 7 : 12}>
                <h2>{title}</h2>
            </Col>
            {searchBar && <SearchBar />}
        </Row>
        <Row className='justify-content-center'>
            <Col xxl={10}>{children}</Col>
        </Row>
    </Container>
  );
};

export default SectionContainer;