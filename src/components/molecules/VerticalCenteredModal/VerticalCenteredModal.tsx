import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { SuggestedQuotesType } from '../../../utilis/types';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { addQuote, getQuotes } from '../../../redux/actions/quoteAction';
import { StoreStateType } from '../../../utilis/types';
import './VerticalCenteredModal.scss';

interface Props {
    show: boolean
    onHide: () => void
    suggetedQuote: SuggestedQuotesType
}

const VerticalCenteredModal = (props: Props) => {

    const { suggetedQuote: { text, author }, show, onHide } = props;

    const dispatch: Dispatch<any> = useDispatch();
    const { data } = useSelector((state: StoreStateType) => state.auth);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      className='q-vertical-modal'
      centered
      onExiting={() => dispatch(getQuotes())}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Hi {data?.displayName}, welcome to Quotes App!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Suggested quote</h4>
        <p>{text} ({author})</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => {
          onHide();
          }}>Skip</Button>
        <Button variant='info' onClick={() => {
          dispatch(addQuote({ text, author }));
          onHide();
          }}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VerticalCenteredModal;