import React from 'react';
import {Button, Image, Text, View} from 'react-native';
import {Header, Icon, Left} from "native-base";
import Colors from "../../constants/Colors";
import {Ionicons} from "@expo/vector-icons";

const PaymentsScreen = (props) => {
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
                <Text style={{color: 'white', fontSize: 34}}>Transaction Completed!</Text>
                <Text style={{color: 'white'}}>Total Charge: $16.97</Text>

            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>

                <Image style={{width: '100%', height: 500}} source={require('../../assets/qr.png')}/>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.primary}}>
                <Text style={{color: 'white'}}>Please present to vendor to receive items</Text>

            </View>


            <View style={{justifyContent: 'center', alignItems: 'center'}}>

                {/*<Text style={{color: '#3369CD'}}>Thanks for using </Text>*/}
                {/*<Image style={{width:300, height:100}}  source={require('../../assets/unnamed.png')}/>*/}

                <Button title="View Receipt" color={Colors.primary}/>
                <Button title="Orders" color={Colors.primary} onPress={() => {
                    props.navigation.navigate('Orders')
                }}/>
            </View>

        </View>
    );

};

PaymentsScreen.navigationOptions = props => {
    return {
        headerTitle: 'Payments',
        drawerIcon: drawerConfig => (
            <Ionicons
                name='md-cash'
                size={23}
                color={drawerConfig.tintColor}
            />
        ),
    }

}

export default PaymentsScreen;
