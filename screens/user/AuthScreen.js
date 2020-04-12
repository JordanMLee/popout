import React from 'react';
import {Button, KeyboardAvoidingView, ScrollView, StyleSheet, View} from 'react-native';
import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import Colors from "../../constants/Colors";
import {LinearGradient} from 'expo-linear-gradient'

const AuthScreen = props => {
    return (
        <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={50}
            style={styles.screen}
        >
            <LinearGradient colors={[Colors.primary, Colors.accent]} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input
                            id="email"
                            label="E-Mail"
                            keyboard='email-address'
                            required
                            email
                            autoCapitalize="none"
                            errorMessage="Please enter a valid address"
                            onInputChange={() => {
                            }}
                            initialValue=""
                        />
                        <Input
                            id="password"
                            label="Password"
                            keyboard="default"
                            secureTextEntry
                            required
                            minLength={5}
                            autoCapitalize="none"
                            errorMessage="Please enter a valid password"
                            onInputChange={() => {
                            }}
                            initialValue=""
                        />
                        <View style={styles.buttonContainer}>
                            <Button title="Login" color={Colors.primary}
                                    onPress={() => {
                                    }}/></View>
                        <View style={styles.buttonContainer}>
                            <Button title="Switch to Sign Up" color={Colors.accent}
                                    onPress={() => {
                                    }}/></View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
}

AuthScreen.navigationOptions = {
    headerTitle: 'Authenticate'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    authContainer: {
        width: '100%',
        maxHeight: 400,
        padding: 20,

    },
    gradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignContent: 'center',
    },
    buttonContainer: {
        marginTop: 10,
    }
});
export default AuthScreen;
