import React from 'react';
import {Alert, Button, StyleSheet, Text, View} from "react-native";
import ItemScanner from "./ItemScanner"

import testArr from "../../data/testArr";
import {fetch} from "@tensorflow/tfjs-react-native";

const TestScreen = props => {
    return <ItemScanner/>;
    console.log(testArr);

    const sendToAWS = async () => {
        console.log("sending to AWS");
        try {
            let request = await fetch('https://bd83fcrp0d.execute-api.us-east-2.amazonaws.com/production/predictcafeunit', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({data: testArr["data"]})
            });

            let response = await request.json(); // sends to aws successfully
            Alert.alert(response.body);
            console.log(response.body);
            return response
        } catch (e) {
            console.log(e)
        }
    };

    // const val = sendToAWS();
    // alert(val);


    return (
        <View style={styles.test}>
            <Text>Test Screen</Text>
            <Button title={"Send To AWS"} onPress={sendToAWS}/>
        </View>
    )

};

const styles = StyleSheet.create({
    test: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default TestScreen;
