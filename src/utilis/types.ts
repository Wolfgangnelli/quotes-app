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

export type CopiedValue = string | null

export type CopyFn = (text: string) => Promise<boolean>

export type UserType = {
    email: string
    password: string
    username?: string
}

export type StateType = {
    data: []
    loading: boolean
    error?: any
}

export type SuggestedQuotesStateType = StateType & {}

export type QuoteAddStateType = StateType & {}

export type QuotesStateType = StateType & {}

export type QuotesFilteredStateType = StateType & {}

export type AuthStateType = StateType & {
    isLoggedIn: boolean
}

export type StoreStateType = {
    suggestedQuotes: SuggestedQuotesStateType
    quoteAdd: QuoteAddStateType
    quotes: QuotesStateType
    quotesFiltered: QuotesFilteredStateType
    auth: AuthStateType
}