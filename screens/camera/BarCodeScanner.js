import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
// import {BarCodeScanner} from 'expo-barcode-scanner';
import {useDispatch, useSelector} from 'react-redux';
import * as cartActions from '../../store/actions/cart';
import {Ionicons} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import {Header, Icon, Left} from "native-base";

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

    const handleBarCodeScanned = async ({type, data}) => {
        try {


            setScanned(true);
            // recognize item currently spindrift
            let scannedProduct = await products.find(prod => prod.barcode === data);


            // add item to cart
            dispatch(cartActions.addToCart(scannedProduct));
            await alert(`Added ${scannedProduct.title} to cart\n${data}`);
        } catch (error) {
            alert(`Unrecognized barcode, please try again`);
        }
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={{flex: 1}}>
            <Header style={{backgroundColor: Colors.primary}} headerTitle={"Scan Items"}>
                <Left>
                    <Icon iconSize={23} color={Colors.accent} name="md-menu" onPress={() => {
                        props.navigation.openDrawer()
                    }}/>
                </Left>
            </Header>

            <View style={styles.container}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />

                {scanned && (
                    <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)}/>
                )}
            </View>

        </View>
    );
};

Scanner.navigationOptions = props => {

    return {
        headerTitle: 'Scanner',
        drawerIcon: drawerConfig => (
            <Ionicons
                name='md-barcode'
                size={23}
                color={drawerConfig.tintColor}
            />
        ),
        // headerStyle: {
        //     backgroundColor: Colors.primary
        // },
        // headerTintColor: 'white'
    }

};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    }
});
export default Scanner;
