(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{184:function(e,t,i){"use strict";i.r(t);var n=i(0),s=i(190);t.default=function(){return n.createElement(s.b,null,n.createElement(s.a,{init:function(e,t,i){var n,s,o,r,a,c,h,p=new BABYLON.FreeCamera("camera",new BABYLON.Vector3(0,10,-10),t);p.setTarget(BABYLON.Vector3.Zero()),p.attachControl(i,!0),(n=new BABYLON.DirectionalLight("light1",new BABYLON.Vector3(.5,-1,.5),t)).position=new BABYLON.Vector3(0,10,0),n.intensity=.5,new BABYLON.HemisphericLight("light2",new BABYLON.Vector3(.5,1,0),t).intensity=.2,new BABYLON.HemisphericLight("light3",new BABYLON.Vector3(.5,-1,.5),t).intensity=.3,(s=BABYLON.Mesh.CreateSphere("sphere1",8,1,t)).position.x=-.5,s.position.y=1,(o=BABYLON.Mesh.CreateSphere("sphere2",8,1,t)).position.x=.5,o.position.y=1,(r=BABYLON.MeshBuilder.CreateCylinder("cylinder1",{diameterTop:.03,diameterBottom:.03,height:2,subdivisions:8},t)).position.x=-.5,r.position.y=2.5,s.addChild(r),(a=BABYLON.MeshBuilder.CreateCylinder("cylinder2",{diameterTop:.03,diameterBottom:.03,height:2,subdivisions:8},t)).position.x=.5,a.position.y=2.5,o.addChild(a),(c=new BABYLON.AbstractMesh("point1",t)).position.x=-.5,c.position.y=3.5,(h=new BABYLON.AbstractMesh("point2",t)).position.x=.5,h.position.y=3.5;var B,d=new BABYLON.ShadowGenerator(512,n);d.useBlurExponentialShadowMap=!0,d.getShadowMap().renderList.push(s,o,r,a),(B=BABYLON.Mesh.CreateGround("ground",6,6,2,t)).receiveShadows=!0;var l=new BABYLON.Vector3(0,-9.8,0),m=new BABYLON.CannonJSPlugin;t.enablePhysics(l,m),B.physicsImpostor=new BABYLON.PhysicsImpostor(B,BABYLON.PhysicsImpostor.BoxImpostor,{mass:0,restitution:.5,disableBidirectionalTransformation:!0},t),s.physicsImpostor=new BABYLON.PhysicsImpostor(s,BABYLON.PhysicsImpostor.SphereImpostor,{mass:1,restitution:.95,disableBidirectionalTransformation:!0},t),o.physicsImpostor=new BABYLON.PhysicsImpostor(o,BABYLON.PhysicsImpostor.SphereImpostor,{mass:1,restitution:.95,disableBidirectionalTransformation:!0},t),c.physicsImpostor=new BABYLON.PhysicsImpostor(c,BABYLON.PhysicsImpostor.ParticleImpostor,{mass:0,disableBidirectionalTransformation:!0},t),c.physicsImpostor.addJoint(s.physicsImpostor,new BABYLON.PhysicsJoint(BABYLON.PhysicsJoint.Hinge2Joint,{connectedPivot:new BABYLON.Vector3(0,2.5,0),connectedAxis:new BABYLON.Vector3(0,0,0),collision:!1})),h.physicsImpostor=new BABYLON.PhysicsImpostor(h,BABYLON.PhysicsImpostor.ParticleImpostor,{mass:0},t),h.physicsImpostor.addJoint(o.physicsImpostor,new BABYLON.PhysicsJoint(BABYLON.PhysicsJoint.Hinge2Joint,{connectedPivot:new BABYLON.Vector3(0,2.5,0),connectedAxis:new BABYLON.Vector3(0,0,0),collision:!1})),s.physicsImpostor.applyImpulse(new BABYLON.Vector3(-7,0,0),s.getAbsolutePosition()),e.runRenderLoop(function(){return t.render()})}}))}},186:function(e,t,i){"use strict";var n=i(0),s=i(189),o=i.n(s);i(187),t.a=function(e){var t=e.children;return n.createElement(n.Fragment,null,n.createElement(o.a,null,n.createElement("title",null,"babylon-practice")),t)}},187:function(e,t,i){},190:function(e,t,i){"use strict";var n=i(13),s=i.n(n),o=i(0),r=i(193),a=function(e){function t(){for(var t,i=arguments.length,n=new Array(i),s=0;s<i;s++)n[s]=arguments[s];return(t=e.call.apply(e,[this].concat(n))||this).scene=null,t.engine=null,t.canvas=o.createRef(),t.state={width:0,height:0},t.onResize=function(){return t.setCanvasSize()},t}s()(t,e);var i=t.prototype;return i.setCanvasSize=function(){this.setState({width:this.props.width||window.innerWidth,height:this.props.height||window.innerHeight})},i.componentDidUpdate=function(e){e.width===this.props.width&&e.height===this.props.height||this.setCanvasSize(),this.engine&&this.engine.resize()},i.componentDidMount=function(){var e=this.props,t=e.init,i=e.engineOptions,n=e.adaptToDeviceRatio,s=this.canvas.current;this.engine=new r.Engine(s,!0,i,n),this.scene=new r.Scene(this.engine),t&&t(this.engine,this.scene,s),this.setCanvasSize(),window.addEventListener("resize",this.onResize)},i.componentWillUnmount=function(){window.removeEventListener("resize",this.onResize)},i.render=function(){var e=this.props.className,t=this.state,i=t.width,n=t.height;return o.createElement("canvas",{className:e,width:i,height:n,ref:this.canvas})},t}(o.Component),c=i(186);i.d(t,"a",function(){return a}),i.d(t,"b",function(){return c.a})}}]);
//# sourceMappingURL=component---src-pages-scenes-pendulum-index-tsx-03eff43a62b13c65bd2a.js.map