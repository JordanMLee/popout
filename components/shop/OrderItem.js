import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import CartItem from "./CartItem";
import Colors from "../../constants/Colors";

const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>
                    ${props.amount.toFixed(2)}
                </Text>
                <Text style={styles.date}>
                    {props.date}
                </Text>
            </View>
            <Button color={Colors.primary} title={showDetails ? "Hide Details" : "Show Details"} onPress={() => {
                setShowDetails(prevState => !prevState)
            }}/>
            {showDetails && <View style={styles.detailItems}>
                {props.items.map(cartItem => (
                    <CartItem
                        key={cartItem.productId}
                        quantity={cartItem.quantity}
                        amount={cartItem.sum}
                        title={cartItem.productTitle}
                    />
                ))}

            </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    orderItem: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},

        shadowRadius: 8,

        borderRadius: 10,
        backgroundColor: 'white',
        padding: 10,
        margin: 20,
        alignItems: 'center'

    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    date: {
        fontSize: 16,
        color: '#888'
    },
    totalAmount: {
        fontWeight: 'bold',
        fontSize: 16
    },
    detailItems: {
        width: '100%'
    }

});
export default OrderItem;
