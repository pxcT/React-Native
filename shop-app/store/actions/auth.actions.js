export const SIGN_UP = 'SINGNUP'
export const LOGIN = 'LOGIN'

export const signup = (email, password) => {
    return async dispatch => {
        const response =  await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAG4s-gNI4RU03My1OsA-Bg0vwWFGFijz8', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });
        if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something wnt wrong!';

            if (errorId === 'EMAIL_EXISTS') {
                message = 'This email exists already';
            }

            throw new Error(message);
        }

        const resData = await response.json();

        dispatch({
            type: SIGN_UP,
            token: resData.idToken,
            userId: resData.localId
        });
    }
}

export const login = (email, password) => {
    return async dispatch => {
        const response =  await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAG4s-gNI4RU03My1OsA-Bg0vwWFGFijz8', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });
        if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something wnt wrong!';

            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email could not be found';
            } else if(errorId === 'INVALID_PASSWORD') {
                message = 'This password is not valid';                
            }

            throw new Error(message);
        }

        const resData = await response.json();

        dispatch({
            type: LOGIN,
            token: resData.idToken,
            userId: resData.localId
        });
    }
}