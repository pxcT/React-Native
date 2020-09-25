import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Button,
	ActivityIndicator,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import Card from '../../components/UI/Card';

import * as cartActions from '../../store/actions/cart.actions';
import * as ordersActions from '../../store/actions/orders.actions';

const CartScreen = (props) => {
	const [isLoading, setIsLoading] = useState(false);

	const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
	const cartItems = useSelector((state) => {
		const transformedCartItems = [];
		for (const key in state.cart.items) {
			const {
				productTitle,
				productPrice,
				quantity,
				sum,
			} = state.cart.items[key];
			transformedCartItems.push({
				productId: key,
				productTitle,
				productPrice,
				quantity,
				sum,
			});
		}
		return transformedCartItems.sort((a, b) =>
			a.productId > b.productId ? 1 : -1
		);
	});

	const dispatch = useDispatch();

	const sendOrderHandler = async () => {
		setIsLoading(true);
		await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
		setIsLoading(false);
	};

	const removeOrderHandler = async () => {
		setIsLoading(true);
		await dispatch(cartActions.removeFromCart(itemData.item.productId));
		setIsLoading(false);
	};

	return (
		<View style={styles.screen}>
			<Card style={styles.summary}>
				<View>
					<Text style={styles.summaryText}>
						Total:{' '}
						<Text style={styles.amount}>
							$
							{(Math.round(cartTotalAmount.toFixed(2)) * 100) /
								100}
						</Text>
					</Text>
				</View>
				{isLoading ? (
					<ActivityIndicator size='small' color={Colors.primary} />
				) : (
					<Button
						color={Colors.accent}
						title='Order Now'
						disabled={cartItems.length === 0}
						onPress={sendOrderHandler}
					/>
				)}
			</Card>
			<View>
				<FlatList
					keyExtractor={(item) => item.productId}
					data={cartItems}
					renderItem={(itemData) => (
						<CartItem
							deletable
							quantity={itemData.item.quantity}
							title={itemData.item.productTitle}
							amount={itemData.item.sum}
							onRemove={removeOrderHandler}
						/>
					)}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		margin: 20,
	},
	summary: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 20,
		padding: 10,
	},
	summaryText: {
		fontFamily: 'open-sans-bold',
		fontSize: 18,
	},
	amount: {
		color: Colors.primary,
	},
});

CartScreen.navigationOptions = {
	headerTitle: 'Your Cart',
};

export default CartScreen;
