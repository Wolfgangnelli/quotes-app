import { SuggestedQuotesType } from './types';

export interface SuggestedQuotesState {
    loading: boolean;
    data: SuggestedQuotesType[];
    error?: string | undefined;
}

export interface QuotesState extends SuggestedQuotesState {}

export interface UseFormInputs {
    username: string 
    email: string 
    password: string 
    confirmPassword?: string 
    acceptTerms?: boolean 
  }