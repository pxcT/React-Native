import * as orderActions from '../../store/actions/orders.actions';

const intialState = {
    orders: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case orderActions.ADD_ORDER:
            return {
                ...state
            }
    }

    return state;
}