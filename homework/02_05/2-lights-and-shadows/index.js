/*
This example adds lights and uses a 'phong' material which responds to those lights.

It also adds a shadow.  Note that the shadow parameters need to be updated on the renderer, on the light, and on the objects casting and receiving shadows.
*/
import * as THREE from "three";

// create a scene in which all other objects will exist
let scene = new THREE.Scene();
scene.background = new THREE.Color("rgb(101, 149, 132)");

// create a camera and position it in space
let aspect = window.innerWidth / window.innerHeight;
let camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
camera.position.z = 20; // place the camera in space
camera.position.y = 20
//camera.position.x = -5;

// the renderer will actually show the camera view within our <canvas>
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

//texture
let textureLoader = new THREE.TextureLoader();
let myFlowerTexture = textureLoader.load("driedLeaf.jpg");

// change the texture parameters if you like!
myFlowerTexture.wrapS = THREE.RepeatWrapping;
myFlowerTexture.wrapT = THREE.RepeatWrapping;
myFlowerTexture.repeat.set(1, 1);

// create a sphere
let geometry = new THREE.SphereGeometry(1, 100, 100);
let material = new THREE.MeshPhongMaterial({ color: "blue" });
let my3DObject = new THREE.Mesh(geometry, material);
my3DObject.castShadow = true;
// and add it to the scene
//scene.add(my3DObject);

//create leaf spheres
const leafColor = new THREE.Color("rgb(141, 193, 174)");
let leafMat = new THREE.MeshPhysicalMaterial({
  color: "rgb(141, 193, 174)",
  roughness: 0,
  transmission:0.5,
  sheen: 1,
}
)

const spheres = [];

for ( let i = 0; i < 800; i ++ ) {
  const mesh = new THREE.Mesh( geometry, leafMat );
  mesh.position.x = Math.random() * 200 - 100 ; //*1 goes flat
  mesh.position.y = Math.random() * 3 - 0.5;
  mesh.position.z = Math.random() * 100 - 100;
  mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;
  mesh.castShadow = true;
  scene.add( mesh );
  spheres.push( mesh );
}

// //create sky
// // const skyColor = new THREE.Color("rgb(141, 193, 174)");
const skyColor = new THREE.Color("rgb(141, 193, 174)");
let skyMat = new THREE.MeshPhysicalMaterial({
  color: "rgb(101, 149, 132)",
  roughness: 0,
  transmission:0.5,
  sheen: 1,
}
)

let skyGeo = new THREE.CircleGeometry( 2, 32 );
const sky = [];

for ( let i = 0; i < 800; i ++ ) {
  const skyMesh = new THREE.Mesh( skyGeo, skyMat );
  skyMesh.position.x = Math.random() * 200 - 100 ; //*1 goes flat
  skyMesh.position.y = Math.random() * 3 + 23;
  skyMesh.position.z = Math.random() * 100 - 100;
  skyMesh.scale.x = skyMesh.scale.y = skyMesh.scale.z = Math.random() * 3 + 1;
  skyMesh.castShadow = true;
  scene.add( skyMesh );
  sky.push( skyMesh );
};

// floor
let floorGeo = new THREE.BoxGeometry(200, 1, 100);
let floorMat = new THREE.MeshPhongMaterial({ map: myFlowerTexture });
let floorMesh = new THREE.Mesh(floorGeo, floorMat);
floorMesh.position.set(0, -2, -50);
floorMesh.receiveShadow = true;
scene.add(floorMesh);

//add a light
let myColor = new THREE.Color(0xffaabb);
let ambientLight = new THREE.AmbientLight("rgb(141, 193, 174)", 0.8);
scene.add(ambientLight);

// add a directional light
let myDirectionalLight = new THREE.DirectionalLight(myColor, 0.85);
myDirectionalLight.position.set(60, 20, -50);
myDirectionalLight.lookAt(0, 0, 0);
scene.add(myDirectionalLight);
myDirectionalLight.castShadow = true;
//Set up shadow properties for the light
myDirectionalLight.shadow.mapSize.width = 512; // default
myDirectionalLight.shadow.mapSize.height = 512; // default
myDirectionalLight.shadow.camera.near = 0.5; // default
myDirectionalLight.shadow.camera.far = 500; // default

// add second directional light
let myDirectionalLight2 = new THREE.DirectionalLight(myColor, 0.85);
myDirectionalLight2.position.set(60, 0, -0);
myDirectionalLight2.lookAt(0, 0, 0);
scene.add(myDirectionalLight2);
myDirectionalLight2.castShadow = true;
//Set up shadow properties for the light
myDirectionalLight2.shadow.mapSize.width = 512; // default
myDirectionalLight2.shadow.mapSize.height = 512; // default
myDirectionalLight2.shadow.camera.near = 0.5; // default
myDirectionalLight2.shadow.camera.far = 500; // default



function loop() {
  // add some movement
  floorMesh.rotateZ(0.01)
  // finally, take a picture of the scene and show it in the <canvas>
  renderer.render(scene, camera);

  window.requestAnimationFrame(loop); // pass the name of your loop function into this function
}
loop();
