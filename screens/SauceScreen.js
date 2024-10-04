import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import RadioForm from 'react-native-simple-radio-button';

export default function SauceScreen({ route, navigation }) {
    const options = [
        {label: 'Add sauce', value: 0 },
        {label: 'No sauce', value: 1 }
      ];

    const [chosenOption, setChosenOption] = useState('0');
    
    setSelected=(value)=>{
        console.log(value);
        setChosenOption(value);
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose the sauce</Text>
                <View style={styles.listStyle}>
                    <RadioForm
                        radio_props={options}
                        initial={0}
                        onPress={(value) => setSelected(value)}
                        buttonColor={'#E04A2B'}
                        labelColor={'#E04A2B'}
                        selectedButtonColor={'#E04A2B'}
                        buttonSize={15}
                        labelStyle={styles.itemText}
                    />
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    title: {
        flex: 1,
        fontSize: 24,
        color: '#E04A2B',
        fontWeight: 'bold',
        marginTop: 20,
    },
    listItemStyle: {
        borderWidth: 1,
        borderColor: "blue",
        padding: 5,
        backgroundColor: "#abc",
        width: "80%",
        alignSelf: "center",
    },
    listStyle: {
        flex: 10,
        width: '80%',
        alignSelf: 'center',
    },
    toppingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    itemText: {
        fontSize: 18,
        color: '#E04A2B',
        marginLeft: 10,
    }
});

