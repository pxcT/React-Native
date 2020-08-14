import React from 'react';
import { View, StyleSheet, Button, Image, Text, Dimensions, ScrollView, SafeAreaView } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = (props) => {
    return (
        <ScrollView>
            <View style={styles.screen}>
                <TitleText>The Game is Over</TitleText>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        fadeDuration={500}
                        source={require('../assets/success.png')}
                        // source={{ uri: 'https://cdn.pixabay.com/photo/2015/01/08/15/48/bridge-593148_960_720.jpg' }}
                        resizeMode="cover"
                    />
                </View>
                <View style={styles.resultContainer}>
                    <BodyText style={styles.resultText}>Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>
                    </BodyText>
                </View>
                <MainButton onPress={props.onRestart}>
                    NEW GAME
                </MainButton>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 3,
        borderColor: 'black',
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: Dimensions.get('window').height / 60
    },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 600 ? 16 : 20
    }
});

export default GameOverScreen;