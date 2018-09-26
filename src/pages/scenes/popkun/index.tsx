import * as React from 'react';
import * as BABYLON from 'babylonjs';
import {
    Layout,
    BabylonCanvas,
} from '../../../components';

BABYLON.Effect.ShadersStore['PopkunPixelShader'] = `
    #ifdef GL_ES
    precision highp float;
    #endif
    varying vec2 vUV;
    uniform float uTime;
    uniform vec3 uColor;

    void main(void) {
        float bandSize = 0.15;
        float halfBandSize = bandSize * 0.5;
        float eyeSize = 0.0025;
        float eyeY = 0.275;
        float eyeX = vUV.x - 0.25;
        float eyeGap = 0.1;
        float irisSize = 0.001;
        float irisX = eyeX + sin(uTime) * 0.02;
        float irisRightY = eyeY + clamp(sin(uTime + radians(180.0)), 0.0, 1.0) * 0.007;
        float irisLeftY = eyeY + clamp(sin(uTime), 0.0, 1.0) * 0.007;
        float irisGap = eyeGap;
        if ((pow(irisX + irisGap, 2.0) + pow(vUV.y - irisLeftY, 2.0)) < irisSize) {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        } else if ((pow(irisX - irisGap, 2.0) + pow(vUV.y - irisRightY, 2.0)) < irisSize) {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        } else if ((pow(eyeX + eyeGap, 2.0) + pow(vUV.y - eyeY, 2.0)) < eyeSize) {
            gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        } else if ((pow(eyeX - eyeGap, 2.0) + pow(vUV.y - eyeY, 2.0)) < eyeSize) {
            gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        } else if (vUV.y > (0.5 - halfBandSize) && vUV.y < (0.5 + halfBandSize)) {
            gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        } else {
            gl_FragColor = vec4(uColor, 1.0);
        }
    }
`;

const PopkunPage = () => <Layout>
    <BabylonCanvas init={(engine, scene, canvas) => {
        { // camera
            const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 3, -7), scene);
            camera.setTarget(BABYLON.Vector3.Zero());
            camera.attachControl(canvas, true);
        }
        let light1: BABYLON.DirectionalLight;
        { // light
            light1 = new BABYLON.DirectionalLight('light1', new BABYLON.Vector3(0.5, -1, 0.5), scene);
            light1.position = new BABYLON.Vector3(0, 10, 0);
            light1.intensity = 0.5;
            const light2 = new BABYLON.HemisphericLight('light2', new BABYLON.Vector3(0.5, 1, 0), scene);
            light2.intensity = 0.2;
            const light3 = new BABYLON.HemisphericLight('light3', new BABYLON.Vector3(0.5, -1, 0.5), scene);
            light3.intensity = 0.3;
        }
        let popkun: BABYLON.Mesh;
        let popkunTexture: BABYLON.CustomProceduralTexture;
        { // popkun
            popkun = BABYLON.Mesh.CreateSphere('popkun', 16, 2, scene);
            popkun.scaling.y = 0.75;
            popkun.position.y = 1;
            popkunTexture = new BABYLON.CustomProceduralTexture('popkun-texture', 'Popkun', 512, scene);
            popkunTexture.setFloat('uTime', 0);
            popkunTexture.setColor3('uColor', new BABYLON.Color3(1, 0, 0));
            const popkunMaterial = new BABYLON.StandardMaterial('popkun-material', scene);
            popkunMaterial.diffuseTexture = popkunTexture;
            popkun.material = popkunMaterial;
        }
        { // shadow
            const shadowGenerator = new BABYLON.ShadowGenerator(512, light1);
            shadowGenerator.useBlurExponentialShadowMap = true;
            shadowGenerator.getShadowMap()!.renderList!.push(
                popkun,
            );
        }
        { // ground
            const ground = BABYLON.Mesh.CreateGround('ground', 6, 6, 2, scene);
            ground.receiveShadows = true;
        }
        engine.runRenderLoop(() => {
            popkunTexture.setFloat('uTime', (Date.now() / 400) % (Math.PI * 2));
            scene.render();
        });
    }}/>
</Layout>;

export default PopkunPage;
