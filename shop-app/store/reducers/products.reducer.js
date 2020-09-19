import PRODUCTS from '../../data/dummy-data';
import Product from '../../models/product';
import { DELETE_PRODUCT } from '../actions/products.actions';

const initialState = {
	availableProducts: PRODUCTS,
	userProducts: PRODUCTS.filter((product) => product.ownerId === 'u1'),
};

export default productsReducer = (state = initialState, action) => {
	switch (action.type) {
		case DELETE_PRODUCT:
			return {
				...state,
				userProducts: state.userProducts.filter(
					(product) => product.id !== action.pid
                ),
                availableProducts: state.availableProducts.filter(
					(product) => product.id !== action.pid
				),
			};
	}
	return state;
};
``;
