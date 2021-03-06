import React from 'react';
import {Button, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Colors from "../../constants/Colors";


const ProductItem = props => {
    return (
        <TouchableOpacity onPress={props.onViewDetail}>
            <View style={styles.product}>
                <Image style={styles.image} source={{uri: props.image}}/>
                <View style={styles.details}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                </View>

                <View style={styles.actions}>
                    <Button color={Colors.primary} title="View Details" onPress={props.onViewDetail}/>
                    <Button color={Colors.primary} title="To Cart" onPress={props.onAddToCart}/>
                </View>
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},

        shadowRadius: 8,

        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 20,

    },
    image: {
        resizeMode: 'center',
        // width: '100%',
        height: '55%',
    },
    title: {
        fontSize: 18,
        marginVertical: 4
    },
    price: {
        fontSize: 14,
        color: '#888',

    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20

    },
    details: {
        alignItems: 'center',
        height: '15%',
        // padding:10
    }


});

export default ProductItem;
