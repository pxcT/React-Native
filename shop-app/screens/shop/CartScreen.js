import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Colors from '../../constants/Colors';
import { useSelector } from 'react-redux';

const CartScreen = props => {
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            const { productTitle, productPrice, quantity, sum } = state.cart.items;
            transformedCartItems.push({ 
                productId: key, 
                productTitle,
                productPrice,
                quantity,
                sum
            });
        }
        return transformedCartItems;
    });

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <View>
                    <Text style={styles.summaryText}>Total: <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text></Text>
                </View>
                <Button color={Colors.accent} title='Order Now' disabled={cartItems.length  === 0}/>
            </View>
            <View>
                <Text>
                    CART ITEMS
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: Colors.primary
    }
});

export default CartScreen;
