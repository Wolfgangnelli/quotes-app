/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from 'react';
import { QuoteType } from '../../../utilis/types';
import { Row, Col, Overlay, Tooltip } from 'react-bootstrap';
import { useCopyToClipboard } from '../../../hooks';
import './QuoteItem.scss';

interface Props {
    quote: QuoteType
}

const QuoteItem = (props: Props) => {

    const { quote: { text, author } } = props;

    const [show, setShow] = useState(false);

    const target = useRef(null);
    const [ value, copy] = useCopyToClipboard();

    const formattingTextQuote = () => {
      return author ? `${text}\n(${author})` : text;
    };

    useEffect(() => {
      if(value && show === false) {
        setShow(true);

        setTimeout(() => {
          setShow(false);
        }, 2000);
      }
    }, [value]);

  return (
    <li className='p-2 my-3 border border-info rounded q-shadow'>
        <Row className='flex'>
          <Col className='flex flex-column' sm={11} xs={10}>
            <Col className='fw-bold'>{text}</Col>
            {!!author?.length && <Col className='fst-italic opacity-75'>({author})</Col>}
          </Col>
          <Col sm={1} xs={2}>
            <span className='copy-element float-start' ref={target} onClick={() => copy(formattingTextQuote())}>
              <i className="fa-solid fa-copy"></i>
            </span>
            <Overlay target={target.current} show={show} placement="top">
            {(props) => (
              <Tooltip {...props}>
                <span className='tooltip-copyed'>Copyed!</span>
              </Tooltip>
            )}
            </Overlay>
          </Col>
        </Row>
    </li>
  );
};

export default QuoteItem;