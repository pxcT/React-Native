import React, { useState } from 'react';
import { Text, View } from 'react-native';

import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import  productsReducer from './store/reducers/products.reducer';

const rootReducer = combineReducers({
    products: productsReducer
});

const store = createStore(rootReducer);

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });
}

export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    if (!fontsLoaded) {
        return (
            <AppLoading startAsync={fetchFonts} onFinish={() => setFontsLoaded(true)} />
        )
    }

    return (
        <Provider store={store}>
            <View>hi</View>
        </Provider>
    );
}
