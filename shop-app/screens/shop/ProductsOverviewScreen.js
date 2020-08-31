import React from 'react';
import { FlatList, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart.actions';

const ProductsOverviewScreen = (props) => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    return (
        <FlatList data={products} key={(item) => item.id} renderItem={(itemData) => {
            return (
                <ProductItem
                    price={itemData.item.price}
                    title={itemData.item.title}
                    image={itemData.item.imageUrl}
                    onViewDetail={() => {
                        props.navigation.navigate('ProductDetail', {
                            productId: itemData.item.id,
                            productTitle: itemData.item.title
                        })
                    }}
                    onAddToCart={() => dispatch(cartActions.addToCart(itemData.item))}
                />
            )
        }} />
    );
}

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'All Products'
}

export default ProductsOverviewScreen;
