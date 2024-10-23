import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableHighlight } from 'react-native';

// Component
export const DetailsScreen = (props) => {
    // Receive the pizza details from previous screen
    const pizza = props.route.params?.pizza; // Accessing the pizza details

    // join toppings together to add into the description
    const joinToppings = () => {
      // if no toppings, says no toppings
      if (!pizza.toppings || pizza.toppings.length === 0) return 'No toppings'; 
      return pizza.toppings.join(', ');
    };

    // Render pizza details
    const renderPizzaDetails = () => {
        if (!pizza) return null;

        return (
            <View style={styles.listItemStyle}>
              <Text style={styles.itemText}>
                Custom Pizza 13€
              </Text>
                <Text style={styles.itemText}>{pizza.dough}, {pizza.sauce}, {joinToppings(pizza)}, {pizza.size}</Text>
                {/* <View style={styles.itemContainer}>
                    <Image source={pizza.image} style={styles.pizzaImage} />
                    <Text style={styles.descriptionText}>Dough: {pizza.dough}</Text>
                </View> */}
            </View>
        );
    };

    // Hardcoded address and payment details for display
    const addressDetails = {
        address: 'Red Str. 89 1. floor',
        paymentMethod: 'Card ending in 1234',
    };

    // Display address and payment method details
    const renderDetails = () => {
        return (
            <View>
                <View style={styles.orderTotalContainerStyle}>
                  <Text style={styles.orderTotalStyle}>Order Total:</Text>
                  <Text style={styles.orderTotalStyle}>13€</Text>
                </View>
                <Text style={styles.text}>Address Details:</Text>
                <View style={styles.orderItemStyle}>
                    <Text style={styles.itemText}>{addressDetails.address}</Text>
                </View>
                <Text style={styles.text}>Payment Method:</Text>
                <View style={styles.orderItemStylePayment}>
                    <Text style={styles.itemText}>{addressDetails.paymentMethod}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={styles.listStyle}>
                <FlatList
                    data={[pizza]} // Wrap pizza in an array for FlatList
                    renderItem={renderPizzaDetails}
                    keyExtractor={(item) => item.id.toString()}
                />
                {renderDetails()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    listItemStyle: {
        flex: 1,
        borderWidth: 2,
        borderColor: '#CD6524',
        padding: 10,
        backgroundColor: '#FFF9F2',
        borderRadius: 20,
        margin: 10,
        width: '80%',
        alignSelf: 'center',
    },
    itemText: {
        color: '#CD6524',
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pizzaImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
    },
    descriptionText: {
        color: '#CD6524',
        fontSize: 16,
        flex: 1,
        textAlign: 'left',
    },
    listStyle: {
        flex: 9,
        alignItems: 'center',
        width: '100%',
    },
    text: {
        color: '#CD6524',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    orderTotalContainerStyle: {
      // flex: 1,
      padding: 5,
      justifyContent: 'space-around',
      paddingLeft: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    orderTotalStyle: {
      flex: 1,
      color: "#CD6524",
      fontSize: 20,
      padding: 6,
      backgroundColor: '#FFF',
      borderRadius: 10,
      margin: 30,
      textAlign: 'center',
    },
    orderItemStyle: {
        borderWidth: 2,
        borderColor: '#F58C41',
        padding: 10,
        backgroundColor: '#FFF',
        borderRadius: 10,
        margin: 10,
        alignSelf: 'center',
    },
    orderItemStylePayment: {
        borderWidth: 2,
        borderColor: '#FFF9F2',
        padding: 10,
        backgroundColor: '#FFE8D8',
        borderRadius: 10,
        margin: 10,
        alignSelf: 'center',
    },
    button: {
        margin: 20,
        paddingVertical: 10,
        width: 250,
        backgroundColor: '#F58C41',
        borderRadius: 40,
        alignSelf: "center",
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
});
