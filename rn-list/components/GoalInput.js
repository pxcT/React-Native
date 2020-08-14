import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal } from 'react-native';

const GoalInput = props => {
    const [enteredGoal, setEnteredGoal] = useState('');

    const goalInputHandler = (enteredText) => {
        setEnteredGoal(enteredText)
    }

    const onAddGoalHandler = () => {
        props.onAddGoal(enteredGoal);
        setEnteredGoal('');
    }

    const onCancelHandler = () => {
        props.onCancel();
        setEnteredGoal('');
    }
    return (
        <Modal visible={props.visible} animationType={"slide"} style={styles.modal}>
            <View style={styles.inputContainer} onPres>
                <TextInput
                    placeholder="Course Goals"
                    style={styles.input}
                    onChangeText={goalInputHandler}
                    value={enteredGoal}
                />
                <View style={styles.actionsContainer}>
                    <View style={styles.button}>
                        <Button title="Cancel" onPress={onCancelHandler} color="red" />
                    </View>
                    <View style={styles.button}>
                        <Button title="ADD" onPress={onAddGoalHandler} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        width: '80%',
        marginBottom: 10
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%'
    },
    button: {
        width: '40%'
    }
})

export default GoalInput;