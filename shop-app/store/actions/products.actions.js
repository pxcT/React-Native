import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
	return async (dispatch) => {
		const response = await fetch(
			'https://rn-complete-guide-aafb9.firebaseio.com/products.json'
		);

		const resData = await response.json();
		const loadedProducts = [];

		for (const key in resData) {
			loadedProducts.push(
				new Product(
					key,
					'u1',
					resData[key].title,
					resData[key].imageUrl,
					resData[key].description,
					resData[key].price
				)
			);
		}

		dispatch({ type: SET_PRODUCTS, products: loadedProducts });
	};
};

export const deleteProduct = (productId) => {
	return { type: DELETE_PRODUCT, pid: productId };
};

export const createProduct = (title, description, imageUrl, price) => {
	return async (dispatch) => {
		// any async code you want!
		const response = await fetch(
			'https://rn-complete-guide-aafb9.firebaseio.com/products.json',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title,
					description,
					imageUrl,
					price,
				}),
			}
		);

		const resData = await response.json();

		dispatch({
			id: resData.name,
			type: CREATE_PRODUCT,
			productData: {
				title,
				description,
				imageUrl,
				price,
			},
		});
	};
};

export const updateProduct = (id, title, description, imageUrl) => {
	return {
		type: UPDATE_PRODUCT,
		pid: id,
		productData: {
			title,
			description,
			imageUrl,
		},
	};
};
