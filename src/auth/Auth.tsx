/* import React, { useState, useEffect, createContext } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useSelector } from 'react-redux';

export const AuthContext = createContext({});

interface Props {
    children: React.ReactNode
}

export const AuthProvider = (props: Props) => {

    const { children } = props;

    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const {auth: authUser} = useSelector((state: any) => state.auth);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            console.log('logout');
        });
    }, [authUser]);

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
}; */
export {};