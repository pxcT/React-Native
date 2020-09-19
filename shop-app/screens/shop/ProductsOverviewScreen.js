import React from 'react';
import { FlatList, Platform, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart.actions';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = (props) => {
	const products = useSelector((state) => state.products.availableProducts);
	const dispatch = useDispatch();

	const selectItemHandler = (id, title) => {
		props.navigation.navigate('ProductDetail', {
			productId: id,
			productTitle: title,
		});
	};

	return (
		<FlatList
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

ProductsOverviewScreen.navigationOptions = (navData) => {
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
