import React from 'react';
import { render, screen } from '@testing-library/react';
import QuotesListing from './QuotesListing';
import { QuoteType } from '../../../utilis/types';

describe('QuoteListing component', () => {

    const quotes: QuoteType[] = [
        { id: '1', text: 'Quote 1', author: 'Author 1' },
        { id: '2', text: 'Quote 2', author: 'Author 2' }
    ];

    it('renders a list of quotes', () => {
        render(<QuotesListing quotes={quotes} />);

        expect(screen.getAllByTestId('quote-item').length).toBe(2);

        quotes.forEach((quote: QuoteType) => {
            expect(screen.getByText(quote.text)).toBeInTheDocument();
        });
    });

    it('renders "No quotes Found!" when no quotes are passed', () => {
        render(<QuotesListing quotes={[]} />);

        expect(screen.getByText(/no quotes!/i)).toBeInTheDocument();
    });
});


/* Defines an array of sample quotes to use as test data.
Uses the render function from React Testing Library to render the QuotesListing component with the sample quotes data.
Uses the getBy* and getAllBy* query functions from React Testing Library to check that the component renders the correct number of QuoteItem components, and that each QuoteItem component displays the correct text and author for its corresponding quote object.
Tests that the component renders the "No quotes Found!" message when an empty quotes array is passed in.
Note that this test assumes that the QuoteItem component is already tested and working correctly, and can be used as a child component of QuotesListing.
 */



