import React from 'react';
import {Text, View} from 'react-native';
import {Camera} from 'expo-camera';
import * as Permissions from 'expo-permissions';
import styles from './styles';
import Toolbar from './toolbar.component';
import Gallery from './gallery.component';
import Colors from "../../constants/Colors";
import {Ionicons} from "@expo/vector-icons";
import * as jpeg from "jpeg-js";
import * as cartActions from "../../store/actions/cart";
import {connect} from "react-redux";


class CameraPage extends React.Component {
    constructor(props) {
        super(props);
    }

    // camera = null;

    state = {
        captures: [],
        capturing: null,
        hasCameraPermission: null,
        cameraType: Camera.Constants.Type.back,
        flashMode: Camera.Constants.FlashMode.off,
        image: null,
    };

    setFlashMode = (flashMode) => this.setState({flashMode});
    setCameraType = (cameraType) => this.setState({cameraType});


    takePhotoAsync = async () => {
        // Alert.alert("Photo button bressed","hey");
        try {
            let response = await this.camera.takePictureAsync({
                base64: true
            });
            const someCoolData = await this.sendToML(response);
            // console.log(someCoolData);
            await this.updateCart(someCoolData);

            this.setState({capturing: false, captures: [response, ...this.state.captures]});

            if (!response.cancelled) {
                const source = {uri: response.uri};
                // console.log(source)
                this.setState({image: source});
                // await this.classifyImage(response.uri)
            }
        } catch (e) {
            console.log(e);

        }

    };

    sendToML = async (image) => {
        // console.log("Ths is the image: ", image);
        try {
            let resp = await fetch("http://10.0.0.207:5000/predictb64", {

                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify({file: image.base64})

            });
            let response = await resp.json();
            console.log("The response: ", response);
            return response;

        } catch (error) {
            console.log(error);
        }
    }

    imageToTensor(rawImageData) {
        const TO_UINT8ARRAY = true;
        const {width, height, data} = jpeg.decode(rawImageData, TO_UINT8ARRAY);
        // Drop the alpha channel info for mobilenet
        const buffer = new Uint8Array(width * height * 3);
        let offset = 0; // offset into original data
        for (let i = 0; i < buffer.length; i += 3) {
            buffer[i] = data[offset];
            buffer[i + 1] = data[offset + 1];
            buffer[i + 2] = data[offset + 2];

            offset += 4;
        }
    }

    updateCart = async (data) => {
        try {
            // console.log(this.props.products);
            console.log("This is the data", data);
            let scannedProduct = await this.props.products.find(prod => prod.title === data.class_name);
            console.log(scannedProduct);
            await this.props.addToCart(scannedProduct);
            await alert(`Added ${scannedProduct.title} to cart`);

        } catch (e) {
            console.log(e)
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

                {captures.length > 0 && <Gallery captures={captures}/>}

                <Toolbar
                    capturing={capturing}
                    flashMode={flashMode}
                    cameraType={cameraType}
                    setFlashMode={this.setFlashMode}
                    setCameraType={this.setCameraType}

                    onTakePhoto={this.takePhotoAsync}
                />
            </React.Fragment>
        );
    };
}

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

// adding redux code
const mapStateToProps = (state) => {
    return {
        products: state.products.availableProducts

    }
};

const mapDispatchToProps = () => {
    return {
        addToCart: cartActions.addToCart
    }
};
// end of new redux code
export default connect(mapStateToProps, mapDispatchToProps())(CameraPage)
