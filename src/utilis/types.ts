import { Timestamp } from "firebase/firestore";

export type ActionType = {
    type: string
    payload: any
}

export type SuggestedQuotesType = {
    text: string
    author: string
}

export type QuoteType = {
    text: string
    author?: string
    createdAt?: Timestamp
    id?: string
}

export type SearchTermContextType = {
    searchTerm: string
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

export interface SuggestedQuotesState {
    loading: boolean;
    data: SuggestedQuotesType[];
    error?: string | undefined;
}

export interface QuotesState extends SuggestedQuotesState {}