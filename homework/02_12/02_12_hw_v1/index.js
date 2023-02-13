import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// create a scene in which all other objects will exist
let scene = new THREE.Scene();
scene.background = new THREE.Color("rgb(9, 35, 30)");

let frameCount = 0;

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

// // add orbit controls
let controls = new OrbitControls(camera, renderer.domElement);

//texture
let textureLoader = new THREE.TextureLoader();

// create a sphere
let geometry = new THREE.SphereGeometry(1, 100, 100);

//create leaf spheres
let sphereMap = new THREE.TextureLoader().load("Alien_Flesh_001_color.jpg");
let sphereDMap = new THREE.TextureLoader().load("Alien_Flesh_001_disp.jpg");

let leafMat = new THREE.MeshPhongMaterial({
  displacementMap: sphereDMap,
  displacementScale: 4,
  map: sphereMap
});

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
let skyMap = new THREE.TextureLoader().load("Alien_Flesh_001_color.jpg");
let skyDMap = new THREE.TextureLoader().load("aerial_rocks_02_disp_4k.png");

let skyMat = new THREE.MeshPhongMaterial({
  displacementMap: skyDMap,
  displacementScale: 3,
  map: skyMap
});

//let skyGeo = new THREE.CircleGeometry( 2, 32 );
let skyGeo = new THREE.IcosahedronGeometry(1 , 0);
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
let floorMesh = new THREE.Mesh(floorGeo,leafMat);
floorMesh.position.set(0, -2, -50);
floorMesh.receiveShadow = true;
scene.add(floorMesh);

//load 3D model pomegranate
let pomGroup = new THREE.Group();
pomGroup.position.set(0,0,0);

let loader = new GLTFLoader();
loader.load( 'food_pomegranate_01_4k.gltf',
 ( object ) => {
  console.log(object)
  object.scene.scale.set(1,1,1);
  object.scene.position.set(2,0,100);
  pomGroup.add(object.scene);
	scene.add(pomGroup);
})

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
myDirectionalLight2.position.set(30, 0, -0);
myDirectionalLight2.lookAt(0, 0, 0);
scene.add(myDirectionalLight2);
myDirectionalLight2.castShadow = true;
//Set up shadow properties for the light
myDirectionalLight2.shadow.mapSize.width = 512; // default
myDirectionalLight2.shadow.mapSize.height = 512; // default
myDirectionalLight2.shadow.camera.near = 0.5; // default
myDirectionalLight2.shadow.camera.far = 500; // default



function loop() {
  // frameCount++
  // // add some movement
  // for (let i=0; i<spheres.length; i++){
  //   spheres[i].position.set(0, 0, Math.sin(frameCount / 100) * 10);
  // }
  // finally, take a picture of the scene and show it in the <canvas>
  renderer.render(scene, camera);

  window.requestAnimationFrame(loop); // pass the name of your loop function into this function
}
loop();


