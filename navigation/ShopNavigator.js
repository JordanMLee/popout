import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer,} from 'react-navigation';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import Colors from "../constants/Colors";

import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import {Ionicons} from "@expo/vector-icons";
import React from 'react';
import Scanner from "../screens/camera/BarCodeScanner";
import {Image, SafeAreaView, ScrollView, View} from 'react-native';


const CustomDrawerComponent = (props) => (
    <SafeAreaView style={{flex: 1}}>
        <View style={{height: 150, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
            <Image source={require('../assets/icon.png')} style={{height: 120, width: 120, borderRadius: 60}}/>
        </View>
        <ScrollView>
            <DrawerItems {...props}/>
        </ScrollView>
    </SafeAreaView>);


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

    Scanner: Scanner,
    Cart: CartScreen,
    Orders: OrdersNavigator,
    Products_admin: ProductsNavigator,
    // Camera: CameraPage,
    // TestScreen: TestScreen,


}, {
    contentComponent: CustomDrawerComponent,
    contentOptions: {
        activeTintColor: Colors.primary
    }
});

export default createAppContainer(ShopNavigator);
