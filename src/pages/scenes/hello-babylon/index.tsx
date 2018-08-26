import * as React from 'react';
import {
    Layout,
    BabylonCanvas,
} from '../../../components';

const HelloBabylonPage = () => <Layout>
    <BabylonCanvas init={(engine, scene, canvas) => {
        { // camera
            const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 5, -10), scene);
            camera.setTarget(BABYLON.Vector3.Zero());
            camera.attachControl(canvas, true);
        }
        { // light
            const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
            light.intensity = 0.7;
        }
        { // sphere
            const sphere = BABYLON.Mesh.CreateSphere('sphere', 16, 2, scene);
            sphere.position.y = 1;
        }
        const _ground = BABYLON.Mesh.CreateGround('ground', 6, 6, 2, scene);
        engine.runRenderLoop(() => scene.render());
    }}/>
</Layout>;

export default HelloBabylonPage;
