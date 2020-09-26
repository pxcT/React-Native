import React, { useState } from 'react';
import { View, Text } from 'react-native';

import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';


import productsReducer from './store/reducers/products.reducer';
import cartReducer from './store/reducers/cart.reducer';
import ordersReducer from './store/reducers/orders.reducer';
import authReducer from './store/reducers/auth.reducer';

import NavigationContainer from './navigation/NavigationContainer';

const rootReducer = combineReducers({
	products: productsReducer,
	cart: cartReducer,
	orders: ordersReducer,
	auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
	return Font.loadAsync({
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
	});
};

export default function App() {
	const [fontsLoaded, setFontsLoaded] = useState(false);

	if (!fontsLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setFontsLoaded(true)}
			/>
		);
	}

	return (
		<Provider store={store}>
			<NavigationContainer/>
		</Provider>
	);
}
