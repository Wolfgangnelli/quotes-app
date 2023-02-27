import './QuotesListing.scss';
import { QuoteType } from '../../../utilis/types';
import { QuoteItem } from '../../molecules';

interface Props {
    quotes: any
}

const QuotesListing = (props: Props) => {

    const { quotes } = props;

    if(!!quotes?.length === false) return <div>No quotes Found!</div>;

  return (
    <ul className='list-unstyled'>
        {quotes?.map((quote: QuoteType, idx: any) => (
            <QuoteItem key={idx} quote={quote}></QuoteItem>
        ))}
    </ul>
  );
};

export default QuotesListing;