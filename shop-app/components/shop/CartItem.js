import React from 'react';

import { StyleSheet, View, Text, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CartItem = props => {
    return (
        <View style={styles.cartItem}>
            <Text style={styles.itemData}>
                <Text style={styles.quantity}> QTY </Text> 
                <Text style={styles.title}> TITLE</Text>
            </Text>
            <View style={styles.itemData}>
                <Text style={styles.amount}>$AMT</Text>
                <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                    <Ionicons 
                        name={Platform.OS == 'android' ? 'md-trash' : 'ios-trash'}
                        size={23}
                        color="red"
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row'
    },
    itemData: {

    },
    quantity: {

    },
    title: {

    },
    amount: {

    },
    deleteButton: {
        marginLeft: 20
    }
});

export default CartItem;