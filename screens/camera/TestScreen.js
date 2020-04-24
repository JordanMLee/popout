import React from 'react';
import {Button, Image, Text, View} from "react-native";
import Colors from "../../constants/Colors";
import {Ionicons} from "@expo/vector-icons";
import {Header, Icon, Left} from "native-base";
import Input from "../../components/UI/Input";

const TestScreen = props => {
    return (
        <View>
            <Header style={{backgroundColor: Colors.primary}} headerTitle={"Scan Items"}>
                <Left>
                    <Icon iconSize={23} color={Colors.accent} name="md-menu" onPress={() => {
                        // this.props.navigation.openDrawer()
                    }}/>
                </Left>
            </Header>
            <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.primary}}>
                <Text style={{color: 'white'}}>Welcome to Summer Music Festival 2020!!</Text>

            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>

                <Image style={{width: '100%'}} source={require('../../assets/unnamed.jpg')}/>
            </View>

            <View>
                <Input/>
                <Button title="Search Vendors" color={Colors.primary}/>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: Colors.accent}}>Sponsored Vendors</Text>
                <Image style={{width: 400, height: 100}} source={require('../../assets/truck.png')}/>

            </View>

        </View>
    );

    // return <ItemScanner/>;

};


TestScreen.navigationOptions = props => {
    const {navigate} = props.navigation;
    return {
        headerTitle: "Scan Items",
        headerStyle: {
            backgroundColor: Colors.primary
        },
        headerTintColor: 'white',

        drawerIcon: drawerConfig => (
            <Ionicons
                name='md-construct'
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    }

};


export default TestScreen;
