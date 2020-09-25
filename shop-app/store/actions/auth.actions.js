export const SIGN_UP = 'SINGNUP'

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
            throw new Error('Something went wrong!');
        }

        const resData = await response.json();

        dispatch({
            type: SIGN_UP
        });
    }
}