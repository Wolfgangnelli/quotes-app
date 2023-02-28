import { QuoteType } from './types';

export const filterQuotes = (searchTerm: string, quotes: QuoteType[]) => {
   return quotes.filter((quote: QuoteType) => quote.text.toLowerCase().includes(searchTerm.toLowerCase()) || quote.author?.toLowerCase().includes(searchTerm.toLowerCase()) && quote);
};