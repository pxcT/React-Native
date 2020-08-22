import React, { useState } from 'react';
import { Text, View } from 'react-native';

import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import { enableScreens } from 'react-native-screens';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import mealsReducer from './store/reducers/meals.reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

import MealsNavigator from './navigation/MealsNavigator';

enableScreens();

const rootReducer = combineReducers({
    meals: mealsReducer
});

const store = createStore(rootReducer, composeWithDevTools());

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });
};

export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false);

    if (!fontLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setFontLoaded(true)}
            />
        );
    }

    return <Provider store={store}>
        <MealsNavigator />
    </Provider>;
}
