import { 
    CREATE_USER_REQUEST, 
    CREATE_USER_SUCCESS, 
    CREATE_USER_FAIL,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
} from './actionTypes';
import { Dispatch } from 'redux';
import { UserType } from '../../utilis/types';
import { createUserWithEmailAndPassword, updateProfile, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';

export const createUser = (userData: UserType) => async (dispatch: Dispatch) => {
    const { email, password, username } = userData;

    try {
        dispatch({
            type: CREATE_USER_REQUEST,
        });

        await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;

            updateProfile(user, { displayName: username }).then(() => {

                dispatch({
                    type: CREATE_USER_SUCCESS,
                    payload: user,
                });

                localStorage.setItem("user", JSON.stringify(user));
            });

        });

    } catch (error) {
        dispatch({
            type: CREATE_USER_FAIL,
            payload: error
        });
    }
};

export const loginUser = (userData: UserType) => async (dispatch: Dispatch) => {
    const { email, password } = userData;

    try {
        dispatch({
            type: LOGIN_USER_REQUEST,
        });

        await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;

            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: user,
            });

            localStorage.setItem("user", JSON.stringify(user));
        });

    } catch (error) {
        dispatch({
            type: LOGIN_USER_FAIL,
            payload: error
        });
    }
};

export const logoutUser = () => async (dispatch: Dispatch) => {
    try {
        dispatch({
            type: LOGOUT_USER_REQUEST,
        });

        await signOut(auth).then(() => {

            dispatch({
                type: LOGOUT_USER_SUCCESS,
            });

            localStorage.removeItem("user");
        });
    } catch (error) {
        dispatch({
            type: LOGOUT_USER_FAIL,
            payload: error
        });
    }
};
