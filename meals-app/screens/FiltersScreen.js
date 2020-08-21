import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';

const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch
                value={props.state}
                onValueChange={props.onChange}
                thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
                trackColor={{
                    true: Colors.primaryColor,
                }} />
        </View>
    )
}

const FiltersScreen = props => {
    const { navigation } = props;

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    const saveFilters = useCallback(() => {
        const appliedFields = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian
        }
        console.log('Save', appliedFields);
    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian]);

    useEffect(() => {
        navigation.setParams({
            save: saveFilters
        });
    }, [saveFilters])

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters/ Restrictions</Text>
            <FilterSwitch label="Gluteen-free" state={isGlutenFree} onChange={newValue => setIsGlutenFree(newValue)}/>
            <FilterSwitch label="Lactose-free" state={isLactoseFree} onChange={newValue => setIsLactoseFree(newValue)}/>
            <FilterSwitch label="Vegan" state={isVegan} onChange={newValue => setIsVegan(newValue)}/>
            <FilterSwitch label="Vegetarian" state={isVegetarian} onChange={newValue => setIsVegetarian(newValue)}/>
        </View>
    );
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 15
    }
});

FiltersScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Filter Meals',
        headerLeft: () => {
            return (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item title="Menu" iconName='ios-menu' onPress={() => {
                        navData.navigation.toggleDrawer();
                    }} />
                </HeaderButtons>
            );
        },
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item title="Save" iconName='ios-save' onPress={navData.navigation.getParam('save')}/>
                </HeaderButtons>
            );
        }
    }
}


export default FiltersScreen;
