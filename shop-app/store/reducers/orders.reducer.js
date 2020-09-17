import * as orderActions from '../../store/actions/orders.actions';
import Order from '../../models/order';

const initialState = {
    orders: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case orderActions.ADD_ORDER:
            const newOrder = new Order(
                new Date().toString(), 
                action.orderData.items, 
                actions.orderData.amount, 
                new Date()    
            );

            return {
                ...state,
                orders: state.orders.concat(newOrder)
            }
    }

    return state;
}