import React, { useState, useEffect, createContext } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../config/firebase';

export const AuthContext = createContext({});

interface Props {
    children: React.ReactNode
}

export const AuthProvider = (props: Props) => {

    const { children } = props;

    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};