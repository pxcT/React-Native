import React from 'react';
import { FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';

const renderProduct = (itemData) => {
    return (
        <Text>{itemData.item.title}</Text>
    );
}

const ProductsOverviewScreen = (props) => {
    const products = useSelector(state => state.products.availableProducts);

    return (
        <FlatList data={products} key={(item) => item.id} renderItem={renderProduct}/>
    );
} 

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'All Products'
}

export default ProductsOverviewScreen;
