import React from 'react';
import { View, Text, StyleSheet, FlatList, Buttton } from 'react-native';


const CartScreen = props => {
    const cartTotalAmount = {
        
    }
    return (
        <View>
            <View>
                <Text>Total: <Text>${19.99}</Text></Text>
                <Button title='Order Now'></Button>
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

});

export default CartScreen;
