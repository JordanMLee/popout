import React from 'react';

import ExpoTHREE, {THREE} from "expo-three";
import * as ThreeAR from 'expo-three-ar';
import {View as GraphicsView} from 'expo-graphics'


class ARexample extends React.Component {
    render() {
        return (
            <GraphicsView
                style={{flex: 1}}
                onRender={this.onRender}
                isArEnabled={true}
                isArCameraStateEnabled={true}
                arTrackingConfiguration={'ARWorldTrackingConfiguration'}
                onContextCreate={this._onGLContextCreate}
            />
        );

    }

    _onGLContextCreate = async ({gl, scale: pixelRatio, width, height}) => {
        this.renderer = new ExpoTHREE.Renderer({gl, pixelRatio, width, height});

        this.scene = new THREE.Scene();
        this.camera = new ThreeAR.Camera(width, height, 0.01, 1000);

        this.renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

        this.scene.background = new ThreeAR.ARBackgroundTexture(this.renderer);
        const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
        const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);

        this.camera.position.z = 5;


    };
    onRender = () => {
        // requestAnimationFrame(animate);
        this.cube.rotation.x += 0.07;
        this.cube.rotation.y += 0.04;
        this.renderer.render(this.scene, this.camera);
        // gl.endFrameEXP();
    };


}

export default ARexample;
