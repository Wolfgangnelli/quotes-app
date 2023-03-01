import { 
    CREATE_USER_REQUEST, 
    CREATE_USER_SUCCESS, 
    CREATE_USER_FAIL 
} from './actionTypes';
import { Dispatch } from 'redux';
import { UserType } from '../../utilis/types';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
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
            });

        });

    } catch (error) {
        dispatch({
            type: CREATE_USER_FAIL,
            payload: error
        });
    }
};