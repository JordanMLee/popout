import React from 'react';
import {applyMiddleware, combineReducers, createStore} from "redux";
import {Provider} from 'react-redux';
import productsReducer from './store/reducers/products';
import ShopNavigator from "./navigation/ShopNavigator";
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import {StatusBar} from "react-native";

import ReduxThunk from 'redux-thunk';
// import ReactReduxContext from "react-redux";
// import {AppLoading} from 'expo';
// import * as Font from 'expo-font';

// ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
StatusBar.setHidden(true);

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

// const fetchFonts = () => {
//     return Font.loadAsync({
//         'courier-bold': require('./assets/fonts/CourierPrime-Bold.ttf'),
//         'courier': require('./assets/fonts/CourierPrime-Regular.ttf')
//     });
// };

export default function App() {
    // const [fontLoaded, setFontLoad] = useState(false);
    // if (fontLoaded) {
    //     return <AppLoading startAsync={fetchFonts} onFinish={() => {
    //         setFontLoad(true);
    //     }}/>;
    // }
    return (
        <Provider store={store}>
            <ShopNavigator/>
        </Provider>
    );
}
