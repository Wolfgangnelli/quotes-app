/* eslint-disable jest/valid-title */
import { render, cleanup } from '@testing-library/react';
import Message from './Message';

afterEach(cleanup);

describe('Message Component', () => {
    const props = {
        label: 'test',
        variant: 'primary',
        className: ''
    };
    
    it('should render Message component correctly', () => {
        render(<Message {...props} />);
    });
});
