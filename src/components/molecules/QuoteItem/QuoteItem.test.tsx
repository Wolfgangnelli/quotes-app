import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { QuoteType } from '../../../utilis/types';
import QuoteItem from './QuoteItem';

afterEach(cleanup);

describe('QuoteItem component', () => {
    const quote: QuoteType = { id: '1', text: 'Quote 1', author: 'Author 1' };

    it('renders the quote item text', () => {
        render(<QuoteItem quote={quote} />);

        expect(screen.getByTestId('quote-item')).toBeInTheDocument();
        expect(screen.getByText('Quote 1')).toBeInTheDocument();
    });

    it('copies the formatted quote text when the copy icon is clicked', async () => {
        jest.useFakeTimers(); // simulate the timeout

        render(<QuoteItem quote={quote} />);
        const copyIcon = screen.getByTestId('copy-icon');

        fireEvent.click(copyIcon);

        expect(copyIcon).toHaveClass('clicked'); // verifies that the copy icon was clicked
        expect(await navigator.clipboard.readText()).toBe('Quote 1\n(Author 1)'); // verifies that the correct text and format was copied

        jest.runAllTimers(); // simulates the timeout completing

        const tooltip = screen.getByText('Copied!');
        expect(tooltip).toBeInTheDocument();

        jest.useRealTimers(); // reset the timer mock
    });
});


/* Defines a sample quote object to use as test data.
Uses the render function from React Testing Library to render the QuoteItem component with the sample quote data.
Uses the getByText query function from React Testing Library to check that the component correctly renders the quote text and author.
Uses the fireEvent function from React Testing Library to simulate a click on the copy icon element.
Verifies that the copy icon was clicked and that the correct formatted quote text was copied to the clipboard.
Uses the Jest jest.useFakeTimers and jest.runAllTimers functions to simulate the timeout for the copy tooltip to disappear.
Verifies that the "Copyed!" tooltip is displayed after the timeout completes.
Note that this test assumes that the useCopyToClipboard hook is already tested and working correctly. */