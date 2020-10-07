import { AsyncStorage } from 'react-native';

// export const SIGN_UP = 'SINGNUP';
// export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';
export const LOGOUT = 'LOGOUT';

let timer;

export const authenticate = (userId, token, expiryTime) => {
	return (dispatch) => {
		dispatch(setLogoutTimer(expiryTime));
		dispatch({ type: AUTHENTICATE, userId, token });
	};
};

export const signup = (email, password) => {
	return async (dispatch) => {
		const response = await fetch(
			'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAG4s-gNI4RU03My1OsA-Bg0vwWFGFijz8',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: email,
					password: password,
					returnSecureToken: true,
				}),
			}
		);
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

		dispatch(
			authenticate(
				resData.localId,
				resData.idToken,
				parseInt(resData.expiresIn) * 1000
			)
		);

		const expirationDate = new Date(
			new Date().getTime() + parseInt(resData.expiresIn) * 1000
		).toISOString();
		saveDataToStorage(resData.idToken, resData.localId, expirationDate);
	};
};

export const login = (email, password) => {
	return async (dispatch) => {
		const response = await fetch(
			'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAG4s-gNI4RU03My1OsA-Bg0vwWFGFijz8',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: email,
					password: password,
					returnSecureToken: true,
				}),
			}
		);
		if (!response.ok) {
			const errorResData = await response.json();
			const errorId = errorResData.error.message;
			let message = 'Something wnt wrong!';

			if (errorId === 'EMAIL_NOT_FOUND') {
				message = 'This email could not be found';
			} else if (errorId === 'INVALID_PASSWORD') {
				message = 'This password is not valid';
			}

			throw new Error(message);
		}

		const resData = await response.json();

		dispatch(
			authenticate(
				resData.localId,
				resData.idToken,
				parseInt(resData.expiresIn) * 1000
			)
		);

		const expirationDate = new Date(
			new Date().getTime() + parseInt(resData.expiresIn) * 1000
		).toISOString();
		saveDataToStorage(resData.idToken, resData.localId, expirationDate);
	};
};

const saveDataToStorage = (token, userId, expirationDate) => {
	AsyncStorage.setItem(
		'userData',
		JSON.stringify({
			token,
			userId,
			expiryDate: expirationDate,
		})
	);
};

const setLogoutTimer = (expirationTime) => {
	return (dispatch) => {
		timer = setTimeout(() => {
			dispatch(logout());
		}, expirationTime);
	};
};

const clearLogoutTimer = () => {
	if (timer) {
		clearTimeout(timer);
	}
};

export const logout = () => {
	clearLogoutTimer();
	AsyncStorage.removeItem('userData');
	return {
		type: LOGOUT,
	};
};

export const setDidTryAL = () => {
	return { type: SET_DID_TRY_AL };
}