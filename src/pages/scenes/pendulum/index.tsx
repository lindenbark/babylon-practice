import * as React from 'react';
import * as BABYLON from 'babylonjs';
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
            light1 = new BABYLON.DirectionalLight('light1', new BABYLON.Vector3(0.5, -1, 0.5), scene);
            light1.position = new BABYLON.Vector3(0, 10, 0);
            light1.intensity = 0.5;
            const light2 = new BABYLON.HemisphericLight('light2', new BABYLON.Vector3(0.5, 1, 0), scene);
            light2.intensity = 0.2;
            const light3 = new BABYLON.HemisphericLight('light3', new BABYLON.Vector3(0.5, -1, 0.5), scene);
            light3.intensity = 0.3;
        }
        let sphere1: BABYLON.Mesh;
        let sphere2: BABYLON.Mesh;
        let cylinder1: BABYLON.Mesh;
        let cylinder2: BABYLON.Mesh;
        let point1: BABYLON.AbstractMesh;
        let point2: BABYLON.AbstractMesh;
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
            cylinder1.position.y = 2.5;
            sphere1.addChild(cylinder1);
            cylinder2 = BABYLON.MeshBuilder.CreateCylinder('cylinder2', {
                diameterTop: 0.03,
                diameterBottom: 0.03,
                height: 2,
                subdivisions: 8,
            }, scene);
            cylinder2.position.x = 0.5;
            cylinder2.position.y = 2.5;
            sphere2.addChild(cylinder2);
            point1 = new BABYLON.AbstractMesh('point1', scene);
            point1.position.x = -0.5;
            point1.position.y = 3.5;
            point2 = new BABYLON.AbstractMesh('point2', scene);
            point2.position.x = 0.5;
            point2.position.y = 3.5;
        }
        { // shadow
            const shadowGenerator = new BABYLON.ShadowGenerator(512, light1);
            // shadowGenerator.usePoissonSampling = true;
            shadowGenerator.useBlurExponentialShadowMap = true;
            shadowGenerator.getShadowMap()!.renderList!.push(
                sphere1,
                sphere2,
                cylinder1,
                cylinder2,
            );
        }
        let ground: BABYLON.Mesh;
        { // ground
            ground = BABYLON.Mesh.CreateGround('ground', 6, 6, 2, scene);
            ground.receiveShadows = true;
        }
        { // physics
            const gravity = new BABYLON.Vector3(0,-9.8, 0);
            const physics = new BABYLON.CannonJSPlugin();
            scene.enablePhysics(gravity, physics);
            ground.physicsImpostor = new BABYLON.PhysicsImpostor(
                ground,
                BABYLON.PhysicsImpostor.BoxImpostor,
                { mass: 0, restitution: 0.5, disableBidirectionalTransformation: true },
                scene,
            );
            sphere1.physicsImpostor = new BABYLON.PhysicsImpostor(
                sphere1,
                BABYLON.PhysicsImpostor.SphereImpostor,
                { mass: 1, restitution: 0.95, disableBidirectionalTransformation: true },
                scene,
            );
            sphere2.physicsImpostor = new BABYLON.PhysicsImpostor(
                sphere2,
                BABYLON.PhysicsImpostor.SphereImpostor,
                { mass: 1, restitution: 0.95, disableBidirectionalTransformation: true },
                scene,
            );
            point1.physicsImpostor = new BABYLON.PhysicsImpostor(
                point1,
                BABYLON.PhysicsImpostor.ParticleImpostor,
                { mass: 0, disableBidirectionalTransformation: true },
                scene,
            );
            point1.physicsImpostor.addJoint(
                sphere1.physicsImpostor,
                new BABYLON.PhysicsJoint(
                    BABYLON.PhysicsJoint.Hinge2Joint,
                    {
                        connectedPivot: new BABYLON.Vector3(0, 2.5, 0),
                        connectedAxis: new BABYLON.Vector3(0, 0, 0),
                        collision: false,
                    },
                ),
            );
            point2.physicsImpostor = new BABYLON.PhysicsImpostor(
                point2,
                BABYLON.PhysicsImpostor.ParticleImpostor,
                { mass: 0 },
                scene,
            );
            point2.physicsImpostor.addJoint(
                sphere2.physicsImpostor,
                new BABYLON.PhysicsJoint(
                    BABYLON.PhysicsJoint.Hinge2Joint,
                    {
                        connectedPivot: new BABYLON.Vector3(0, 2.5, 0),
                        connectedAxis: new BABYLON.Vector3(0, 0, 0),
                        collision: false,
                    },
                ),
            );
            sphere1.physicsImpostor.applyImpulse(
                new BABYLON.Vector3(-7, 0, 0),
                sphere1.getAbsolutePosition(),
            );
        }
        engine.runRenderLoop(() => scene.render());
    }}/>
</Layout>;

export default PendulumPage;
