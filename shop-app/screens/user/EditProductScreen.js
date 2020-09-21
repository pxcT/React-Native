import React, { useEffect, useCallback, useReducer } from 'react';

import {
	View,
	Text,
	StyleSheet,
	TextInput,
	ScrollView,
	Platform,
	Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

import * as productsActions from '../../store/actions/products.actions';

const FORM_INPUT_UPDATE = 'UPDATE';

const formReducer = (state, action) => {
	if (action.type === FORM_INPUT_UPDATE) {
		const updatedValues = {
			...state.inputValues,
			[action.input]: action.value
		}
	}
};

const EditProductScreen = (props) => {
	const dispatch = useDispatch();

	const prodId = props.navigation.getParam('productId');
	const editedProduct = useSelector((state) =>
		state.products.userProducts.find((product) => product.id === prodId)
	);

	const [fromState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			title: editedProduct ? editedProduct.title : '',
			imageUrl: editedProduct ? editedProduct.imageUrl : '',
			description: editedProduct ? editedProduct.description : '',
			price: '',
		},
		inputValidities: {
			title: editedProduct ? true : false,
			imageUrl: editedProduct ? true : false,
			description: editedProduct ? true : false,
			price: editedProduct ? true : false,
		},
		formIsValid: editedProduct ? true : false,
	});

	// *useCallback - makes sure that this function is not recreated every time the component is rendered that resulting in entering in a infinte loop
	const submitHandler = useCallback(() => {
		if (!titleIsValid) {
			Alert.alert('Wrong input!', 'Please check the errors in the form', [
				{ text: 'Okay' },
			]);
			return;
		}

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
	}, [dispatch, prodId, title, description, imageUrl, price, titleIsValid]);

	// *useEffect - execute code when the render is finished
	useEffect(() => {
		props.navigation.setParams({ submit: submitHandler });
	}, [submitHandler]);

	const textChangeHandler = (inputIdentifier, text) => {
		let isValid = false;

		if (text.trim().length > 0) {
			isValid = true;
		}

		dispatchFormState({
			type: FORM_INPUT_UPDATE,
			value: text,
			isValid,
			input: inputIdentifier,
		});
	};

	return (
		<ScrollView>
			<View style={styles.form}>
				<View style={styles.formControl}>
					<Text style={styles.label}>Title</Text>
					<TextInput
						style={styles.input}
						value={title}
						keyboardType='default'
						onChangeText={textChangeHandler.bind(this, 'title')}
						autoCapitalize='sentences'
						autoCorrect
						returnKeyType='next'
						onEndEditing={() => console.log('done edditing')}
						onSubmitEditing={() => console.log('Submit Editting')}
					/>
					{!titleIsValid && <Text>Please enter a valid title!</Text>}
				</View>
				<View style={styles.formControl}>
					<Text style={styles.label}>Image URL</Text>
					<TextInput
						style={styles.input}
						value={imageUrl}
						onChangeText={textChangeHandler.bind(this, 'imageUrl')}
					/>
				</View>
				{!editedProduct && (
					<View style={styles.formControl}>
						<Text style={styles.label}>Price</Text>
						<TextInput
							style={styles.input}
							value={price}
							keyboardType='decimal-pad'
							onChangeText={textChangeHandler.bind(this, 'price')}
						/>
					</View>
				)}
				<View style={styles.formControl}>
					<Text style={styles.label}>Description</Text>
					<TextInput
						style={styles.input}
						value={description}
						onChangeText={textChangeHandler.bind(this, 'description')}
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
