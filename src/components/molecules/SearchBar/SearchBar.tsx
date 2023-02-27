import { useContext } from 'react';
import { Form, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { SearchTermContext } from '../../../pages/HomePage/HomePage';


const SearchBar = () => {

  const { data } = useSelector((state: any) => state.quotes);
  const { searchTerm, setSearchTerm } = useContext(SearchTermContext);
  

  return (
    <Col xxl={4}>
      <Form>
          <Form.Group className="mb-3">
          <Form.Label>Search quote</Form.Label>
          <Form.Control type="text" placeholder="Enter a keyword" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </Form.Group>
    </Form>
    </Col>
  );
};

export default SearchBar;