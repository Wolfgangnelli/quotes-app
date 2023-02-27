import React from 'react';
import { QuoteType } from '../../../utilis/types';
import { Row, Col } from 'react-bootstrap';
import './QuoteItem.scss';

interface Props {
    quote: QuoteType
}

const QuoteItem = (props: Props) => {

    const { quote: { text, author } } = props;

  return (
    <li className='p-2 my-3 border border-info rounded q-shadow'>
        <Row className='flex flex-column'>
            <Col className='fw-bold'>{text}</Col>
            {!!author?.length && <Col className='fst-italic opacity-75'>({author})</Col>}
        </Row>
    </li>
  );
};

export default QuoteItem;