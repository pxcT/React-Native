import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AL } from '../actions/auth.actions';

const initialState = {
	token: null,
	userId: null,
	didTryAutoLogin: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case AUTHENTICATE:
			return {
				...state,
				token: action.token,
				userId: action.userId,
				didTryAutoLogin: true
			};
		case LOGOUT:
			return {
				...initialState,
				didTryAutoLogin: true
			};

		case SET_DID_TRY_AL:
			return {
				...state,
				didTryAutoLogin: true
			}
		default:
			return state;
	}
};
