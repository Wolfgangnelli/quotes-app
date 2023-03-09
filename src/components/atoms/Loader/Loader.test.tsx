/* eslint-disable jest/valid-title */
import { render, cleanup } from '@testing-library/react';
import Loader from './Loader';

afterEach(cleanup);

describe('Loader Component', () => {
    it('should render Loader component correctly', () => {
        render(<Loader />);
    });
});
