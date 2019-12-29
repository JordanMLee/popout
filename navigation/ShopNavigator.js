import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer,} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import Colors from "../constants/Colors";

import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import {Ionicons} from "@expo/vector-icons";
import React from 'react';
import Scanner from "../screens/camera/BarCodeScanner";

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Colors.primary
        },
        headerTintColor: 'white'
    },
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons
                name='md-cart'
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    }
});

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen,
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Colors.primary
        },
        headerTintColor: 'white'
    },
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons
                name='md-list'
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    }

});

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Scanner: Scanner,
    // Camera: CameraPage,
    // TestScreen: TestScreen,


}, {
    contentOptions: {
        activeTintColor: Colors.primary
    }
});

export default createAppContainer(ShopNavigator);
