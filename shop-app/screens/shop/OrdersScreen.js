import React, { useState, useCallback, useEffect } from 'react';
import {
	FlatList,
	Text,
	Platform,
	View,
	StyleSheet,
	Button,
	ActivityIndicator,
} from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

import OrderItem from '../../components/shop/OrderItem';

import { useSelector, useDispatch } from 'react-redux';
import * as ordersActions from '../../store/actions/orders.actions';
import Colors from '../../constants/Colors';

const OrdersScreen = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const dispatch = useDispatch();

	const orders = useSelector((state) => state.orders.orders);

	const loadOrders = useCallback(async () => {
		setError(null);
		setIsLoading(true);
		try {
			await dispatch(ordersActions.fetchOrders());
		} catch (error) {
			setError(error.message);
		}
		setIsLoading(false);
	}, [dispatch, setIsLoading, setError]);

	useEffect(() => {
		loadOrders();
	}, [dispatch, loadOrders]);

	if (error) {
		return (
			<View style={styles.centered}>
				<Text>An error occured!</Text>
				<Button
					title='Try again'
					onPress={ordersActions.fetchOrders}
					color={Colors.primary}
				/>
			</View>
		);
	}

	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size='large' color={Colors.primary} />
			</View>
		);
    }
    
    if (orders && orders.length === 0) {
        return (
            <View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<Text>No orders found, maybe start ordering some products !</Text>
			</View>
        )
    }

	return (
		<FlatList
			data={orders}
			renderItem={(itemData) => {
				return (
					<OrderItem
						amount={itemData.item.totalAmount}
						date={itemData.item.readableDate}
						items={itemData.item.items}
					/>
				);
			}}
		/>
	);
};

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

const screenOptions = (navData) => {
	return {
		headerTitle: 'Your orders',
		headerLeft: () => {
			return (
				<HeaderButtons HeaderButtonComponent={HeaderButton}>
					<Item
						title='Cart'
						iconName={
							Platform.OS == 'android' ? 'md-menu' : 'ios-menu'
						}
						onPress={() => {
							navData.navigation.toggleDrawer();
						}}
					/>
				</HeaderButtons>
			);
		},
	};
};

export default OrdersScreen;
