import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function DoughScreen({ route, navigation }) {
    return (
        <View style={{flex:1}}>
            <View style={{flex:8}}>
                <Text>Choose the dough</Text>
            </View>
        </View>
      );
}

const styles = StyleSheet.create({
    listItemStyle: {
        borderWidth: 1,
        borderColor: "blue",
        padding: 5,
        backgroundColor: "#abc",
        width: "80%",
        alignSelf: "center",
    },
    listStyle: {
        flex: 8,
        alignItems: "center",
        backgroundColor: "#eee",
        borderColor: "red",
        borderWidth: 2,
        width: "100%",
    },
    flatliststyle: {
        width: '80%',
        backgroundColor: 'blue',
    },
});
