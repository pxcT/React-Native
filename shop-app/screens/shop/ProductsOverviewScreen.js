import React from 'react';
import { FlatList, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart.actions'; 

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

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

ProductsOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item title='Cart' iconName={Platform.OS == 'android' ? 'md-cart' : 'ios-cart'} onPress={() => {
                        navData.navigation.navigate('Cart');
                    }}/>
                </HeaderButtons>
            )
        },
        headerLeft: () => {
            return (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item title='Cart' iconName={Platform.OS == 'android' ? 'md-menu' : 'ios-menu'} onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}/>
                </HeaderButtons>
            )
        }
    };
}

export default ProductsOverviewScreen;
