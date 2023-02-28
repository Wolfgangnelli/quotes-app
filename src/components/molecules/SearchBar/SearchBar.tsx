import { Form, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { searchQuote } from '../../../redux/actions/quoteAction';


const SearchBar = () => {

  const dispatch: Dispatch<any> = useDispatch();

  const handleChange = (searchTerm: string) => {
    dispatch(searchQuote(searchTerm));
  };
  
  return (
    <Col xxl={4}>
      <Form>
          <Form.Group className="mb-3">
          <Form.Label>Search quote</Form.Label>
          <Form.Control type="text" placeholder="Enter a keyword" onChange={(e) => handleChange(e.target.value)} />
          </Form.Group>
    </Form>
    </Col>
  );
};

export default SearchBar;