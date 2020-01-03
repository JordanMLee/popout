import React from 'react';
import {Text, View} from 'react-native';
import {Camera} from 'expo-camera';
import * as Permissions from 'expo-permissions';
import styles from './styles';
import Toolbar from './toolbar.component';
import Colors from "../../constants/Colors";
import {Ionicons} from "@expo/vector-icons";


export default class CameraPage extends React.Component {
    camera = null;

    state = {
        captures: [],
        capturing: null,
        hasCameraPermission: null,
        cameraType: Camera.Constants.Type.back,
        flashMode: Camera.Constants.FlashMode.off,
    };

    setFlashMode = (flashMode) => this.setState({flashMode});
    setCameraType = (cameraType) => this.setState({cameraType});
    handleCaptureIn = () => this.setState({capturing: true});

    handleCaptureOut = () => {
        if (this.state.capturing)
            this.camera.stopRecording();
    };

    handleShortCapture = async () => {
        const photoData = await this.camera.takePictureAsync();
        this.setState({capturing: false, captures: [photoData, ...this.state.captures]});

        // const someCoolData = await this.sendToML(photoData);
    };

    handleLongCapture = async () => {
        const videoData = await this.camera.recordAsync();
        this.setState({capturing: false, captures: [videoData, ...this.state.captures]});
    };

    sendToML = async (image) => {
        console.log("sending to ml");
        try {
            let resp = await fetch('https://2d2cmhl2yb.execute-api.us-east-2.amazonaws.com/test/predictemotions', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({data: image.base64})
            });

            let response = await resp.json();
            // await console.log(response);
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error)
        }
    };


    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');

        this.setState({hasCameraPermission});
    };

    render() {
        const {hasCameraPermission, flashMode, cameraType, capturing, captures} = this.state;

        if (hasCameraPermission === null) {
            return <View/>;
        } else if (hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }

        return (
            <React.Fragment>
                <View>
                    <Camera
                        type={cameraType}
                        flashMode={flashMode}
                        style={styles.preview}
                        ref={camera => this.camera = camera}

                    />
                </View>

                {/*{captures.length > 0 && <Gallery captures={captures}/>}*/}

                <Toolbar
                    capturing={capturing}
                    flashMode={flashMode}
                    cameraType={cameraType}
                    setFlashMode={this.setFlashMode}
                    setCameraType={this.setCameraType}
                    onCaptureIn={this.handleCaptureIn}
                    onCaptureOut={this.handleCaptureOut}
                    onLongCapture={this.handleLongCapture}
                    onShortCapture={this.handleShortCapture}
                />
            </React.Fragment>
        );
    };
};

CameraPage.navigationOptions = props => {
    const {navigate} = props.navigation;
    return {
        headerStyle: {
            backgroundColor: Colors.primary
        },
        headerTintColor: 'white',

        drawerIcon: drawerConfig => (
            <Ionicons
                name='md-camera'
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    }

};
