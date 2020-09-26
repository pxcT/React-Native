import PRODUCTS from '../../data/dummy-data';
import Product from '../../models/product';
import {
	CREATE_PRODUCT,
	DELETE_PRODUCT,
	UPDATE_PRODUCT,
	SET_PRODUCTS
} from '../actions/products.actions';

const initialState = {
	availableProducts: [],
	userProducts: [],
};

export default productsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_PRODUCTS: {
			return {
				availableProducts: action.products,
				userProducts: action.userProducts
			}
		}
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
		case CREATE_PRODUCT:
			const { title, imageUrl, description, price, id, ownerId } = action.productData;
			const newProduct = new Product(
				id,
				ownerId,
				title,
				imageUrl,
				description,
				price
			);

			return {
				...state,
				availableProducts: state.availableProducts.concat(newProduct),
				userProducts: state.userProducts.concat(newProduct),
			};

		case UPDATE_PRODUCT:
			const productIndex = state.userProducts.findIndex(
				(prod) => prod.id === action.pid
			);

            const availableProductIndex = state.availableProducts.findIndex(
                (prod) => prod.id === action.pid
            );

			const updatedProduct = new Product(
				action.pid,
				state.userProducts[productIndex].ownerId,
				action.productData.title,
				action.productData.imageUrl,
				action.productData.description,
				state.userProducts[productIndex].price
			);

            const updatedUserProducts = [...state.userProducts];
            updatedUserProducts[productIndex] = updatedProduct;

            const updatedAvailableProducts = [...state.userProducts];
            updatedAvailableProducts[availableProductIndex] = updatedProduct;


			return {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts
			};
	}
	return state;
};
