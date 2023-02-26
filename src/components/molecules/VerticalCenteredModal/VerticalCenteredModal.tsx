import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { SuggestedQuotesType } from '../../../utilis/types';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { addQuote } from '../../../redux/actions/quoteAction';
import './VerticalCenteredModal.scss';

interface Props {
    show: boolean
    onHide: () => void
    suggetedQuote: SuggestedQuotesType
}

const VerticalCenteredModal = (props: Props) => {

    const { suggetedQuote: { text, author }, show, onHide } = props;

    const dispatch: Dispatch<any> = useDispatch();

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      className='q-vertical-modal'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Hi, welcome to Quotes App!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Suggested quote</h4>
        <p>{text} ({author})</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Skip</Button>
        <Button variant='info' onClick={() => dispatch(addQuote({ text, author }))}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VerticalCenteredModal;