import * as React from 'react';
import {
    Layout,
    BabylonCanvas,
} from '../../../components';

const PendulumPage = () => <Layout>
    <BabylonCanvas init={(engine, scene, canvas) => {
        { // camera
            const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 10, -10), scene);
            camera.setTarget(BABYLON.Vector3.Zero());
            camera.attachControl(canvas, true);
        }
        let light1: BABYLON.DirectionalLight;
        { // light
            light1 = new BABYLON.DirectionalLight('light1', new BABYLON.Vector3(0,-1,0), scene);
            light1.position = new BABYLON.Vector3(0, 100, 0);
            light1.intensity = 0.5;
            const light2 = new BABYLON.HemisphericLight('light2', new BABYLON.Vector3(0, 1, 0), scene);
            light2.intensity = 0.2;
            const light3 = new BABYLON.HemisphericLight('light3', new BABYLON.Vector3(0, -1, 0), scene);
            light3.intensity = 0.3;
        }
        let sphere1: BABYLON.Mesh;
        let sphere2: BABYLON.Mesh;
        let cylinder1: BABYLON.Mesh;
        let cylinder2: BABYLON.Mesh;
        { // pendulum
            sphere1 = BABYLON.Mesh.CreateSphere('sphere1', 8, 1, scene);
            sphere1.position.x = -0.5;
            sphere1.position.y = 1;
            sphere2 = BABYLON.Mesh.CreateSphere('sphere2', 8, 1, scene);
            sphere2.position.x = 0.5;
            sphere2.position.y = 1;
            cylinder1 = BABYLON.MeshBuilder.CreateCylinder('cylinder1', {
                diameterTop: 0.03,
                diameterBottom: 0.03,
                height: 2,
                subdivisions: 8,
            }, scene);
            cylinder1.position.x = -0.5;
            cylinder1.position.y = 2;
            cylinder2 = BABYLON.MeshBuilder.CreateCylinder('cylinder2', {
                diameterTop: 0.03,
                diameterBottom: 0.03,
                height: 2,
                subdivisions: 8,
            }, scene);
            cylinder2.position.x = 0.5;
            cylinder2.position.y = 2;
        }
        { // shadow
            const shadowGenerator = new BABYLON.ShadowGenerator(512, light1);
            shadowGenerator.useBlurExponentialShadowMap = true;
            shadowGenerator.getShadowMap()!.renderList.push(
                sphere1,
                sphere2,
                cylinder1,
                cylinder2,
            );
        }
        { // ground
            const ground = BABYLON.Mesh.CreateGround('ground', 6, 6, 2, scene);
            ground.receiveShadows = true;
        }
        engine.runRenderLoop(() => scene.render());
    }}/>
</Layout>;

export default PendulumPage;
