import * as React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import * as Permissions from 'expo-permissions';

import {BarCodeScanner} from 'expo-barcode-scanner';
import {Ionicons} from "@expo/vector-icons";

// import {useDispatch, useSelector} from "react-redux";
// import * as cartActions from '../../store/actions/cart';

export default class Scanner extends React.Component {
    state = {
        hasCameraPermission: null,
        scanned: false,
    };

    async componentDidMount() {
        this.getPermissionsAsync();
    }

    getPermissionsAsync = async () => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
    };

    // dispatch = useDispatch();

    render() {
        const {hasCameraPermission, scanned} = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
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
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />

                {scanned && (
                    <Button title={'Tap to Scan Again'} onPress={() => this.setState({scanned: false})}/>
                )}
            </View>
        );
    }

    handleBarCodeScanned = ({type, data}) => {

        this.setState({scanned: true});

        // find corresponding item for noe use second item (spindrift)
        // eventually replace with data
        // const scannedItem = useSelector(state => {
        //     state.products.availableProducts.find(prod => prod.id === 'p2')
        // });

        // add item to cart
        // this.dispatch(cartActions.addToCart(scannedItem));
        // alert(`Item ${scannedItem.title} was added to the cart`)
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);


    };
}

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
