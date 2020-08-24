import React, { useState } from 'react';
import { Text, View } from 'react-native';

import * as Font from 'expo-font';
import { AppLoading } from 'expo';

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
        <View>
            <Text>Open up App.js to start working on your app!</Text>
        </View>
    );
}
