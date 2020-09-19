import React, { useState, useEffect, useCallback } from 'react';

import {
	View,
	Text,
	StyleSheet,
	TextInput,
	ScrollView,
	Platform,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

import * as productsActions from '../../store/actions/products.actions';

const EditProductScreen = (props) => {
	const dispatch = useDispatch();

	const prodId = props.navigation.getParam('productId');
	const editedProduct = useSelector((state) =>
		state.products.userProducts.find((product) => product.id === prodId)
	);

	const [title, setTitle] = useState(
		editedProduct ? editedProduct.title : ''
	);
	const [imageUrl, setImageUrl] = useState(
		editedProduct ? editedProduct.imageUrl : ''
	);
	const [price, setPrice] = useState('');
	const [description, setDescription] = useState(
		editedProduct ? editedProduct.description : ''
	);

	// *useCallback - makes sure that this function is not recreated every time the component is rendered that resulting in entering in a infinte loop
	const submitHandler = useCallback(() => {
		if (editedProduct) {
			dispatch(
				productsActions.updateProduct(
					prodId,
					title,
					description,
					imageUrl
				)
			);
		} else {
			dispatch(
				productsActions.createProduct(
					title,
					description,
					imageUrl,
					+price
				)
			);
        }
        props.navigation.goBack();
	}, [dispatch, prodId, title, description, imageUrl, price]);

	// *useEffect - execute code when the render is finished
	useEffect(() => {
		props.navigation.setParams({ submit: submitHandler });
	}, [submitHandler]);

	return (
		<ScrollView>
			<View style={styles.form}>
				<View style={styles.formControl}>
					<Text style={styles.label}>Title</Text>
					<TextInput
						style={styles.input}
						value={title}
						onChangeText={(text) => setTitle(text)}
					/>
				</View>
				<View style={styles.formControl}>
					<Text style={styles.label}>Image URL</Text>
					<TextInput
						style={styles.input}
						value={imageUrl}
						onChangeText={(text) => setImageUrl(text)}
					/>
				</View>
				{!editedProduct && (
					<View style={styles.formControl}>
						<Text style={styles.label}>Price</Text>
						<TextInput
							style={styles.input}
							value={price}
							onChangeText={(text) => setPrice(text)}
						/>
					</View>
				)}
				<View style={styles.formControl}>
					<Text style={styles.label}>Description</Text>
					<TextInput
						style={styles.input}
						value={description}
						onChangeText={(text) => {
							setDescription(text);
						}}
					/>
				</View>
			</View>
		</ScrollView>
	);
};

EditProductScreen.navigationOptions = (navData) => {
	const submitFn = navData.navigation.getParam('submit');
	return {
		headerTitle: navData.navigation.getParam('productId')
			? 'Edit Product'
			: 'Add Product',
		headerRight: () => {
			return (
				<HeaderButtons HeaderButtonComponent={HeaderButton}>
					<Item
						title='Save'
						iconName={
							Platform.OS == 'android'
								? 'md-checkmark'
								: 'ios-checkmark'
						}
						onPress={submitFn}
					/>
				</HeaderButtons>
			);
		},
	};
};

const styles = StyleSheet.create({
	form: {
		margin: 20,
	},
	formControl: {
		width: '100%',
	},
	label: {
		fontFamily: 'open-sans-bold',
		marginVertical: 8,
	},
	input: {
		paddingHorizontal: 2,
		paddingVertical: 5,
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
	},
});

export default EditProductScreen;
