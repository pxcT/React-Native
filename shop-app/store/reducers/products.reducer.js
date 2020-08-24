import PRODUCTS from '../../data/dummy-data';
import Product from '../../models/product';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(product => products.owerId === 'u1');
}

export default productsReducer = (state = initialState, action) => {
    return state;
}