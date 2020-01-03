import React from 'react'
import {ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import * as tf from '@tensorflow/tfjs'
import {fetch} from '@tensorflow/tfjs-react-native'
import * as mobilenet from '@tensorflow-models/mobilenet'
import * as jpeg from 'jpeg-js'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import Colors from "../../constants/Colors";
import {Header, Icon, Left} from "native-base";

class ItemScanner extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        isTfReady: false,
        isModelReady: false,
        predictions: null,
        image: null
    };

    async componentDidMount() {
        await tf.ready();
        this.setState({
            isTfReady: true
        });
        this.model = await mobilenet.load({
            version: 1,
            alpha: 0.25,

        });
        this.setState({isModelReady: true});
        this.getPermissionAsync();
        this.getCameraPermissionAsync();
        console.log("Component Mounted");
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!')
            }
        }
    };

    getCameraPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA);
            if (status !== 'granted') {
                alert('please grant camera permissions too')
            }
        }
    };

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

        return tf.tensor3d(buffer, [height, width, 3])
    }

    sendToAWS = async (input) => {
        console.log("sending to AWS");
        try {
            let request = await fetch('https://bd83fcrp0d.execute-api.us-east-2.amazonaws.com/production/predictcafeunit', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                // body: JSON.stringify({data: testArr["data"]})
                body: JSON.stringify({data: JSON.stringify(input)})
            });

            let response = await request.json(); // sends to aws successfully
            Alert.alert(response.body);
            // console.log(response.body);
            return response
        } catch (e) {
            console.log(e)
        }
    };


    classifyImage = async () => {
        try {
            const imageAssetPath = Image.resolveAssetSource(this.state.image);
            const response = await fetch(imageAssetPath.uri, {}, {isBinary: true});
            const rawImageData = await response.arrayBuffer();
            const imageTensor = this.imageToTensor(rawImageData);
            // console.log(imageTensor.print());
            const imgEmbedding = this.model.infer(imageTensor, true);
            const vals = await imgEmbedding.data();
            const sl = await vals.slice(0, 110);
            const slc = await Array.prototype.slice.call(sl);
            await console.log(slc);
            // await console.log(sl.length);
            // await console.log(imgEmbedding.print());

            const AWSRespone = this.sendToAWS(slc);
            await console.log(AWSRespone);

            const predictions = await this.model.classify(imageTensor);
            this.setState({predictions});
            console.log(predictions);

            // add correct items to cart


        } catch (error) {
            console.log(error);
        }
    };

    takePhotoAsync = async () => {
        try {
            let response = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3]

            });
            if (!response.cancelled) {
                const source = {uri: response.uri};
                this.setState({image: source});
                this.classifyImage()
            }
        } catch (e) {
            console.log(e);

        }

    };

    selectImage = async () => {
        try {
            let response = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3]
            });

            if (!response.cancelled) {
                const source = {uri: response.uri};
                this.setState({image: source});
                this.classifyImage()
            }
        } catch (error) {
            console.log(error)
        }
    };

    renderPrediction = prediction => {
        return (
            <Text key={prediction.className} style={styles.text}>
                {prediction.className}
            </Text>
        )
    };

    render() {
        const {isTfReady, isModelReady, predictions, image} = this.state;


        return (
            <View style={styles.container}>
                {/*<StatusBar barStyle='light-content'/>*/}
                <Header style={{backgroundColor: Colors.primary}} headerTitle={"Scan Items"}>
                    <Left>
                        <Icon iconSize={23} color={Colors.accent} name="md-menu" onPress={() => {
                            // this.props.navigation.openDrawer()
                        }}/>
                    </Left>
                </Header>
                <View style={styles.loadingContainer}>
                    <View style={{alignItems: 'center'}}>
                        {isModelReady && isTfReady ? <Text>Model Ready</Text> : <ActivityIndicator size='small'/>}
                    </View>
                </View>
                <View style={{alignItems: 'center'}}>

                    <TouchableOpacity
                        style={styles.imageWrapper}
                        // onPress={isModelReady ? this.selectImage : undefined}>
                        onPress={isModelReady ? this.takePhotoAsync : undefined}>

                        {image && <Image source={image} style={styles.imageContainer}/>}

                        {isModelReady && !image && (
                            <Text style={styles.transparentText}>Tap to take picture</Text>
                        )}
                    </TouchableOpacity>
                </View>
                <View style={styles.predictionWrapper}>
                    {isModelReady && image && (
                        <Text style={styles.text}>
                            Predictions: {predictions ? '' : 'Predicting...'}
                        </Text>
                    )}
                    {isModelReady &&
                    predictions &&
                    predictions.map(p => this.renderPrediction(p))}
                </View>
            </View>
        )
    }
}


// adding redux code


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        // alignItems: 'center'
    },
    loadingContainer: {
        marginTop: 80,
        justifyContent: 'center'
    },
    text: {

        fontSize: 16
    },
    loadingModelContainer: {
        flexDirection: 'row',
        marginTop: 10
    },
    imageWrapper: {
        width: 280,
        height: 280,
        padding: 10,
        borderColor: Colors.primary,
        borderWidth: 5,
        borderStyle: 'solid',
        marginTop: 40,
        marginBottom: 10,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 250,
        height: 250,
        position: 'absolute',
        top: 10,
        left: 10,
        bottom: 10,
        right: 10
    },
    predictionWrapper: {
        height: 100,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center'
    },

});

export default ItemScanner;
