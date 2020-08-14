import { StyleSheet, View, FlatList, Button } from 'react-native';
import React, { useState } from 'react';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
	const [courseGoals, setCourseGoals] = useState([])
	const [isAddMode, setIsAddMode] = useState(false);

	const addGoalHandler = (goalTitle) => {
		setCourseGoals((currentGoals) => {
			return [...currentGoals, { id: Math.random().toString(), value: goalTitle}]
		})
		setIsAddMode(() => false);
	}

	const removeGoalHandler = (goalId) => {
		setCourseGoals((currentGoals) => {
			return currentGoals.filter((goal) => goal.id !== goalId);
		})
	}

	const cancelGoalAdditionHandler = () => {
		setIsAddMode(false);
		
	}

	return (
		<View
			style={styles.screen}>
			<Button title="Add New Goal" onPress={() => setIsAddMode(true)}/>
			<GoalInput visible={isAddMode} onAddGoal={addGoalHandler} onCancel={cancelGoalAdditionHandler}/>
			<FlatList
				data={courseGoals}
				keyExtractor={(item, index) => item.id}
				renderItem={itemData => 
				<GoalItem 
					title={itemData.item.value}
					id={itemData.item.id}
					onDelete={removeGoalHandler}
				/> 
			} 
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		padding: 30
	}
});
