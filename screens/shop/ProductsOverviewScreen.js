import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from '../../store/actions/cart';
import Colors from "../../constants/Colors";

import * as productsActions from '../../store/actions/products';
// experimental
// import withBadge from "../../components/UI/withBadge";

const ProductsOverviewScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(productsActions.fetchProducts());
        } catch (err) {
            setError(err.message);

        }
        setIsLoading(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {

        loadProducts();

    }, [dispatch, loadProducts]);

    if (isLoading) {
        return <View style={styles.centered}>
            <ActivityIndicator size='large' colors={Colors.primary}/>
        </View>
    }

    if (error) {
        return <View style={styles.centered}>
            <Text>An Error Occurred</Text>
            <Button title="try again" onPress={loadProducts} colors={Colors.primary}/>
        </View>
    }

    if (!isLoading && products.length === 0) {
        return <View style={styles.centered}>
            <Text>No Products found.</Text>
        </View>
    }

    return (
        <FlatList
            data={products}
            renderItem={itemData => <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onViewDetail={() => {
                    props.navigation.navigate(
                        'ProductDetail', {
                            productId: itemData.item.id,
                            productTitle: itemData.item.title,

                        });

                }}
                onAddToCart={() => {
                    dispatch(cartActions.addToCart(itemData.item))
                }}>

            </ProductItem>}
        />
    )
};

ProductsOverviewScreen.navigationOptions = props => {

    // const BadgedIcon = withBadge(1);
    return {
        headerTitle: "All Products",
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton} title='Cart'>
                <Item
                    title='Menu'
                    iconName='md-menu'
                    onPress={() => {
                        props.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: (
            <View style={{flex: 1, flexDirection: 'row'}}>


                <HeaderButtons HeaderButtonComponent={CustomHeaderButton} title='Cart'>
                    <Item
                        title='Cart'
                        iconName='md-cart'
                        onPress={() => {
                            props.navigation.navigate('Cart')
                        }}/>
                </HeaderButtons>

                {/*<HeaderButtons HeaderButtonComponent={CustomHeaderButton} title='Cart'>*/}
                {/*    <Item*/}
                {/*        title='Cart'*/}
                {/*        iconName='md-cart'*/}
                {/*        onPress={() => {*/}
                {/*            props.navigation.navigate('Cart')*/}
                {/*        }}/>*/}
                {/*</HeaderButtons>*/}
                {/*<BadgedIcon*/}
                {/*    name={'md-cart'}*/}
                {/*    // type={"ionicons"}*/}

                {/*/>*/}
            </View>
        )
    }
};

const styles = StyleSheet.create({
    centered: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    }
})

export default ProductsOverviewScreen;

