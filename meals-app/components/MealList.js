import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import MealItem from '../components/MealItem';

const MealList = props => {
    const renderMealItem = (itemData) => {
        return(
            <MealItem 
                title={itemData.item.title} 
                image={itemData.item.imageUrl}
                onSelectMeal={() => props.navigation.navigate({
                    routeName: 'MealDetail',
                    params: {
                        mealId: itemData.item.id
                    }
                })}
                duration={itemData.item.duration}
                complexity={itemData.item.complexity.toUpperCase()}
                affordability={itemData.item.affordability.toUpperCase()}
            />
        );
    }


    return (
        <View style={styles.list}>
            <FlatList
                data={props.listData}
                keyExtractor={(item, index) => item.id}
                renderItem={renderMealItem}
                style={{ width: '100%', padding: 10 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default MealList;