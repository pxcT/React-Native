import React from 'react';
import { View, StyleSheet, Image, Button, ScrollView, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../store/actions/cart.actions';

import Colors from '../../constants/Colors';

const ProductDetailScreen = props => {
    const productId = props.route.params ? props.route.params.productId : null;
    const selectedProduct = useSelector(state => state.products.availableProducts.find(product => product.id == productId));
    const dispatch = useDispatch();

    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
            <View style={styles.actions}>
                <Button color={Colors.primary} title="Add to Cart" onPress={() => dispatch(cartActions.addToCart(selectedProduct))} />
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)} </Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    );
}

export const screenOptions = (navData) => {
    return {
        headerTitle: navData.route.params ? navData.route.params.productTitle : null
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    },  
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'open-sans-bold'
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20,
        fontFamily: 'open-sans'
    }
});

export default ProductDetailScreen;