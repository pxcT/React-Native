import React, { useState, useEffect, useCallback} from 'react';
import {
	FlatList,
	Platform,
	Button,
	ActivityIndicator,
	View,
	Text,
	StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart.actions';
import * as productsActions from '../../store/actions/products.actions';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [error, setError] = useState();
	
	const products = useSelector((state) => state.products.availableProducts);
	// const products = [];
	const dispatch = useDispatch();

	const loadProducts = useCallback(async () => {
		setError(null);
		setIsRefreshing(true);
		try {
			await dispatch(productsActions.fetchProducts());
		} catch(err) {
			setError(err.message);
		}
		setIsRefreshing(false);
	}, [dispatch, setIsLoading, setError]);

	useEffect(() => {
		setIsLoading(true)
		loadProducts().then(() => {
			setIsLoading(false);
		});
	}, [dispatch, loadProducts]);

	useEffect(() => {
		const unsubscribe = props.navigation.addListener('focus', () => {
			loadProducts();
		})
		return () => {
			unsubscribe();
		}
	}, [loadProducts]);

	const selectItemHandler = (id, title) => {
		props.navigation.navigate('ProductDetail', {
			productId: id,
			productTitle: title,
		});
	};

	if (error) {
		return (
			<View style={styles.centered}>
				<Text>An error occured!</Text>
				<Button title="Try again" onPress={loadProducts} color={Colors.primary}/>
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


	if (!isLoading && products.length === 0) {
		return (
			<View style={styles.centered}>
				<Text>No products found. Maybe start adding some !</Text>
			</View>
		);
	}

	return (
		<FlatList
			onRefresh={loadProducts}
			refreshing={isRefreshing}
			data={products}
			key={(item) => item.id}
			renderItem={(itemData) => {
				return (
					<ProductItem
						price={itemData.item.price}
						title={itemData.item.title}
						image={itemData.item.imageUrl}
						onSelect={() => {
							selectItemHandler(
								itemData.item.id,
								itemData.item.title
							);
						}}>
						<Button
							color={Colors.primary}
							title='View Details'
							onPress={() => {
								selectItemHandler(
									itemData.item.id,
									itemData.item.title
								);
							}}
						/>
						<Button
							color={Colors.primary}
							title='To Cart'
							onPress={() =>
								dispatch(cartActions.addToCart(itemData.item))
							}
						/>
					</ProductItem>
				);
			}}
		/>
	);
};

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export const screenOptions = (navData) => {
	return {
		headerTitle: 'All Products',
		headerRight: () => {
			return ( 
				<HeaderButtons HeaderButtonComponent={HeaderButton}>
					<Item
						title='Cart'
						iconName={
							Platform.OS == 'android' ? 'md-cart' : 'ios-cart'
						}
						onPress={() => {
							navData.navigation.navigate('Cart');
						}}
					/>
				</HeaderButtons>
			);
		},
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

export default ProductsOverviewScreen;
