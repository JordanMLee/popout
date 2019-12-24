import React from 'react';
import {Button, Image, ScrollView, StyleSheet, Text,} from 'react-native';

import {useDispatch, useSelector} from "react-redux";
import Colors from "../../constants/Colors";
import * as cartActions from '../../store/actions/cart';

const ProductDetailScreen = props => {

    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state =>
        state.products.availableProducts.find(prod => prod.id === productId)
    );
    const dispatch = useDispatch();

    return (
        <ScrollView>
            <Image styles={styles.image} source={{uri: selectedProduct.imageUrl}}/>
            <Button color={Colors.primary} title="Add to Cart" onPress={() => {
                dispatch(cartActions.addToCart(selectedProduct));
            }}/>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>


        </ScrollView>

    )
};

ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
};
const styles = StyleSheet.create({
    image: {
        resizeMode: 'center',
        // width: '100%',
        // height: '55%',
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20
    }

});

export default ProductDetailScreen;
