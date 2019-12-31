import React from 'react';
import {StyleSheet} from "react-native";
import ItemScanner from "./ItemScanner"

const TestScreen = props => {
    return <ItemScanner/>

    // return <View style={styles.test}><Text>Test Screen</Text></View>

};

const styles = StyleSheet.create({
    test: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default TestScreen;
