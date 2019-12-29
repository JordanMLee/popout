import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {useDispatch, useSelector} from 'react-redux';
import * as cartActions from '../../store/actions/cart';
import {Ionicons} from "@expo/vector-icons";


const Scanner = props => {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    const dispatch = useDispatch();
    const products = useSelector(state => state.products.availableProducts);

    useEffect(() => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({type, data}) => {
        setScanned(true);
        // recognize item currently spindrift

        let scannedProduct = products.find(prod => prod.id === 'p2');


        // add item to cart
        dispatch(cartActions.addToCart(scannedProduct));
        alert(`Added ${scannedProduct.title} to cart`);

        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-end',
            }}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />

            {scanned && (
                <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)}/>
            )}
        </View>
    );
};

Scanner.navigationOptions = props => {

    return {
        drawerIcon: drawerConfig => (
            <Ionicons
                name='md-barcode'
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    }

};
export default Scanner;
