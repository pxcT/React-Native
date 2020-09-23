import React, { useEffect, useCallback, useReducer } from 'react';

import {
	View,
	StyleSheet,
	ScrollView,
	Platform,
	Alert,
	KeyboardAvoidingView
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

import * as productsActions from '../../store/actions/products.actions';
import Input from '../../components/UI/Input';

const FORM_INPUT_UPDATE = 'UPDATE';

const formReducer = (state, action) => {
	if (action.type === FORM_INPUT_UPDATE) {
		const updatedValues = {
			...state.inputValues,
			[action.input]: action.value,
		};

		const updatedValidities = {
			...state.inputValidities,
			[action.input]: action.isValid,
		};

		let updatedFormIsValid = true;
		for (const key in updatedValidities) {
			updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
		}

		return {
			...state,
			formIsValid: updatedFormIsValid,
			inputValues: updatedValues,
			inputValidities: updatedValidities,
		};
	}

	return {
		...state,
	};
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

	// TEXT CHANGE HANDLER
	const inputChangeHandler = useCallback(
		(inputIdentifier, inputValue, inputValidity) => {
			dispatchFormState({
				type: FORM_INPUT_UPDATE,
				value: inputValue,
				isValid: inputValidity,
				input: inputIdentifier,
			});
		},
		[dispatchFormState]
	);

	// *useCallback - makes sure that this function is not recreated every time the component is rendered that resulting in entering in a infinte loop
	const submitHandler = useCallback(() => {
		if (!fromState.formIsValid) {
			Alert.alert('Wrong input!', 'Please check the errors in the form', [
				{ text: 'Okay' },
			]);
			return;
		}

		if (editedProduct) {
			dispatch(
				productsActions.updateProduct(
					prodId,
					fromState.inputValues.title,
					fromState.inputValues.description,
					fromState.inputValues.imageUrl
				)
			);
		} else {
			dispatch(
				productsActions.createProduct(
					fromState.inputValues.title,
					fromState.inputValues.description,
					fromState.inputValues.imageUrl,
					+fromState.inputValues.price
				)
			);
		}
		props.navigation.goBack();
	}, [dispatch, prodId, fromState]);

	// *useEffect - execute code when the render is finished
	useEffect(() => {
		props.navigation.setParams({ submit: submitHandler });
	}, [submitHandler]);

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior='padding'
			keyboardVerticalOffset={10}>
			<ScrollView>
				<View style={styles.form}>
					<Input
						id='title'
						label='Title'
						errorText='Please enter a valid title!'
						keyboardType='default'
						autoCapitalize='sentences'
						returnKeyType='next'
						autoCorrect
						onInputChange={inputChangeHandler}
						initialValue={editedProduct ? editedProduct.title : ''}
						initiallyValid={!!editedProduct}
						required
					/>
					<Input
						id='imageUrl'
						label='Image Url'
						errorText='Please enter a valid image url!'
						keyboardType='default'
						returnKeyType='next'
						onInputChange={inputChangeHandler}
						initialValue={
							editedProduct ? editedProduct.imageUrl : ''
						}
						initiallyValid={!!editedProduct}
						required
					/>
					{!editedProduct && (
						<Input
							id='price'
							label='Price'
							errorText='Please enter a valid price!'
							keyboardType='decimal-pad'
							onInputChange={inputChangeHandler}
							returnKeyType='next'
							min={0.1}
						/>
					)}
					<Input
						id='description'
						label='Description'
						errorText='Please enter a valid description!'
						keyboardType='default'
						autoCapitalize='sentences'
						returnKeyType='next'
						autoCorrect
						multiline
						numberOfLines={3}
						onInputChange={inputChangeHandler}
						initiallyValid={!!editedProduct}
						initialValue={
							editedProduct ? initialValue.description : ''
						}
						required
						minLength={5}
					/>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
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
});

export default EditProductScreen;
