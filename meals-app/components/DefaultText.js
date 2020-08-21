import React from 'react';
import { StyleSheet, Text } from 'react-native';

const DefaultText = props => {
    return (
        <Text style={styles.tex}>{props.children}</Text>
    )
}

const styles =StyleSheet.create({
    text: {
        fontFamily: 'open-sans'
    }
});

export default DefaultText;