import { QuoteType } from './types';

export const filterQuotes = (searchTerm: string, quotes: QuoteType[]) => {
   return quotes.filter((quote: QuoteType) => quote.text.toLowerCase().includes(searchTerm.toLowerCase()) || quote.author?.toLowerCase().includes(searchTerm.toLowerCase()) && quote); // posso rimuoverlo
};

// per scalabilità conviene usare i filtri di firestore