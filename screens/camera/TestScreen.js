import React from 'react';
import {StyleSheet} from "react-native";
import ScannerScreen from "./BarCodeScanner";

const TestScreen = props => {

    return <ScannerScreen/>

};

const styles = StyleSheet.create({
    test: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default TestScreen;
