export type ActionType = {
    type: string
    payload: any
}

export type SuggestedQuotesType = {
    text: string
    author: string
}

export type QuotesType = {
    text: string
    author?: string
}

export interface SuggestedQuotesState {
    loading: boolean;
    data: SuggestedQuotesType[];
    error?: string | undefined;
}

export interface QuotesState extends SuggestedQuotesState {}