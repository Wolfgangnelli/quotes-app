/* eslint-disable jest/valid-title */
import { render, cleanup } from '@testing-library/react';
import Button from './Button';

afterEach(cleanup);

describe('Button Component', () => {
    it('should render Button component correctly', () => {
        render(<Button />);
    });
});
