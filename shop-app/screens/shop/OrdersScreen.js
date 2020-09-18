import React from 'react';
import { FlatList, Text, Platform } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

import OrderItem from '../../components/shop/OrderItem';

import { useSelector } from 'react-redux';

const OrdersScreen = props => {
    const orders = useSelector(state => state.orders.orders);

    return (
        <FlatList data={orders} renderItem={(itemData) => {
            return (
                <OrderItem amount={itemData.item.totalAmount} date={itemData.item.readableDate}/>
            )
        }}
        />
    );
}

OrdersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your orders',
        headerLeft: () => {
            return (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item title='Cart' iconName={Platform.OS == 'android' ? 'md-menu' : 'ios-menu'} onPress={() => {
                        navData.navigation.toggleDrawer();
                    }} />
                </HeaderButtons>
            )
        }
    }

};

export default OrdersScreen;