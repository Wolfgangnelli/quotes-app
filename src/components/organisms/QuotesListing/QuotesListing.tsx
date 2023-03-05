import { useEffect } from 'react';
import './QuotesListing.scss';
import { QuoteType } from '../../../utilis/types';
import { QuoteItem } from '../../molecules';
import { useSelector } from 'react-redux';

interface Props {
    quotes: any
}

const QuotesListing = (props: Props) => {

    const { quotes } = props;

    const { findFilteredQuotes, activeFilter } = useSelector((state: any) => state.quotesFiltered);

    
    if(!!quotes?.length === false && activeFilter === false) {
      return <div>No quotes!</div>;
    }; 

  return activeFilter && findFilteredQuotes === false ? (
    <div>There were no quotes with these keywords!</div>
  ) : (
    <ul className='list-unstyled'>
        {quotes?.map((quote: QuoteType, idx: any) => (
            <QuoteItem key={idx} quote={quote}></QuoteItem>
        ))}
    </ul>
  );
};

export default QuotesListing;