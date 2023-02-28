import { SuggestedQuotesType } from './types';

export interface SuggestedQuotesState {
    loading: boolean;
    data: SuggestedQuotesType[];
    error?: string | undefined;
}

export interface QuotesState extends SuggestedQuotesState {}