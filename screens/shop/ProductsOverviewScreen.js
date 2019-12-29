import React from 'react';
import {FlatList, View} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from '../../store/actions/cart';

// experimental
// import withBadge from "../../components/UI/withBadge";

const ProductsOverviewScreen = props => {

    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();
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

export default ProductsOverviewScreen;

