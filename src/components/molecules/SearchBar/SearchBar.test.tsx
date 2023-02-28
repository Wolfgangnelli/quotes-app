/* // Jest Test
import React from 'react';
import { shallow } from 'enzyme';
import { searchQuote } from '../../../redux/actions/quoteAction';
import SearchBar from './SearchBar';
import { Form, Col } from 'react-bootstrap';

describe('SearchBar Component', () => {
  let wrapper;
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = jest.fn();
    wrapper = shallow(<SearchBar dispatch={mockDispatch} />);
  });

  it('should render a Col Component', () => {
    expect(wrapper.find(Col).length).toEqual(1);
  });

  it('should render a Form Component', () => {
    expect(wrapper.find(Form).length).toEqual(1);
  });

  it('should dispatch searchQuote action when handleChange is called', () => {
    wrapper.find(Form.Control).simulate('change', { target: { value: 'test' } });
    expect(mockDispatch).toHaveBeenCalledWith();
  });

}); */

export {};