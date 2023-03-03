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

type AuthProviderDataType = [
    {
        providerId: string
        uid: string
        displayName: string
        email: string
        phoneNumber: string | null
        photoURL: string | null
    }
]

type AuthStsTokenManagerType = {
    refreshToken: string
    accessToken: string
    expirationTime: number
}

export type AuthFirebaseDataType = {
    uid: string
    email: string
    emailVerified: boolean
    displayName: string
    isAnonymous: boolean
    providerData: AuthProviderDataType
    stsTokenManager: AuthStsTokenManagerType
    createdAt: string
    lastLoginAt: string
    apiKey: string
    appName: string
}

export type SuggestedQuotesStateType = StateType & {}

export type QuoteAddStateType = StateType & {}

export type QuotesStateType = StateType & {}

export type QuotesFilteredStateType = StateType & {}

export type AuthStateType = {
    isLoggedIn: boolean
    loading: boolean
    error?: any
    data: AuthFirebaseDataType | null
}

export type StoreStateType = {
    suggestedQuotes: SuggestedQuotesStateType
    quoteAdd: QuoteAddStateType
    quotes: QuotesStateType
    quotesFiltered: QuotesFilteredStateType
    auth: AuthStateType
}