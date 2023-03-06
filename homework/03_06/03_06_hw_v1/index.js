//** hospitalBeeps.mp3 is from 427092__nixeno__nixeno-hospital-room-ambience-with-clock-heart-beeb-and-paging.mp3 at freesound.org*/
//** hospitalBackground.mp3 is from 412933__thef1like__hospital.m4a at freesound.org */
//** ambient sound is my own
import * as THREE from "three";
import { TextureLoader } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// create a scene in which all other objects will exist
let scene = new THREE.Scene();
//scene.background = new THREE.Color("rgb(10,10,10)");
scene.fog = new THREE.Fog('rgb(225,255,255)', 1, 500);
scene.fog.castShadow = true;
// create a camera and position it in space
let aspect = window.innerWidth / window.innerHeight;
let camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
camera.position.z = 20; // place the camera in space
camera.position.y = 20
//camera.position.x = -100;

// the renderer will actually show the camera view within our <canvas>
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

// add an event listener
// we can first declare a listener function (using either of the two approaches listed above)
let rotationSpeed = 0.0001;
function onClick() {
  console.log("Clicked on window!");
  rotationSpeed = rotationSpeed + 0.0005
  if (rotationSpeed > 0.01){
    rotationSpeed = 0.0001;
  }
}
function onKeyDown() {
  console.log("Key down pressed");
}

let cursorX;
let cursorY;
function onPointerMove(event){
  console.log("Pointer moved");
  cursorX = event.pageX;
  cursorY = event.pageY;
  console.log("C X: ",cursorX);
  console.log("C Y: ", cursorY);
};
// then listen to a particular event (click in the example below) on a particular event target (window in the example below)
window.addEventListener("click", onClick, false);
window.addEventListener("keydown", onKeyDown);
window.addEventListener("pointermove", onPointerMove);

// orbit controls
let controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 0;
controls.maxDistance = 250;
controls.maxPolarAngle = Math.PI/2;

// axes helper, comment out when done
// const axesHelper = new THREE.AxesHelper( 100);
// scene.add( axesHelper );

// floor
//const redLightColor = new THREE.Color("rgb(102, 18, 18)");
let metalDisplacementMap = new THREE.TextureLoader().load("./assets/Metal012_1K_Displacement.jpg");
let metalMetalnessMap = new THREE.TextureLoader().load("./assets/Metal012_1K_Metalness.jpg");
let metalRoughnessMap = new THREE.TextureLoader().load("./assets/Metal012_1K_Roughness.jpg");
let metalNormalMap = new THREE.TextureLoader().load("./assets/Metal012_1K_NormalGL.jpg");
let metalColorMap = new THREE.TextureLoader().load("./Metal012_1K_Color.jpg");
let lightMat = new THREE.MeshStandardMaterial({
  displacementMap: metalDisplacementMap,
  metalnessMap: metalMetalnessMap,
  roughnessMap: metalRoughnessMap,
  //normalMap: metalNormalMap,
  map: metalColorMap,
  emissive: 'rgb(200,200,200)',
});
let floorGeo = new THREE.BoxGeometry(700, 1, 500);
let floorMesh = new THREE.Mesh(floorGeo,lightMat);
floorMesh.position.set(0, -2, -50);
floorMesh.receiveShadow = true;
scene.add(floorMesh);

//sphere
let sphereMat = new THREE.MeshStandardMaterial({
  displacementMap: metalDisplacementMap,
  metalnessMap: metalMetalnessMap,
  roughnessMap: metalRoughnessMap,
  //normalMap: metalNormalMap,
  map: metalColorMap,
  emissive: 'rgb(102,0,0)',
});
let sphereGeo = new THREE.SphereGeometry(5, 32, 32 );
const sphereMesh = new THREE.Mesh(sphereGeo,sphereMat);
sphereMesh.castShadow = true;
sphereMesh.position.set(-200,20,-100);
scene.add(sphereMesh);

//skybox
let materialArray = [];
let texture_ft = new THREE.TextureLoader().load( './assets/fog.png');
let texture_bk = new THREE.TextureLoader().load( './assets/fog.png');
let texture_up = new THREE.TextureLoader().load( './assets/fog.png');
let texture_dn = new THREE.TextureLoader().load( './assets/fog.png');
let texture_rt = new THREE.TextureLoader().load( './assets/fog.png');
let texture_lf = new THREE.TextureLoader().load( './assets/fog.png');
  
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));
   
for (let i = 0; i < 6; i++)
  materialArray[i].side = THREE.BackSide;
   
let skyboxGeo = new THREE.BoxGeometry( 500, 500, 500);
let skybox = new THREE.Mesh( skyboxGeo, materialArray );
scene.add( skybox );


//sounds
function addSpatialAudio() {
  // global sound
  let audioListener = new THREE.AudioListener();
  camera.add(audioListener);
  const audioLoader = new THREE.AudioLoader();
  const globalSound = new THREE.Audio(audioListener);
  audioLoader.load( './assets/hospitalRoomDrone.mp3', function( buffer ) {
    globalSound.setBuffer(buffer);
    globalSound.setLoop(true);
    globalSound.setVolume(0.05);
    globalSound.play();
  });
  //local sound beeps (connected to sphere)
  const localAudio = new THREE.PositionalAudio(audioListener);
  const audioLoader2 = new THREE.AudioLoader();
  audioLoader2.load( './assets/hospitalBeeps.mp3', function( buffer ) {
    localAudio.setBuffer( buffer );
    localAudio.setVolume(1);
    localAudio.setRefDistance(25);
    localAudio.play();
  });
  sphereMesh.add(localAudio);
  //local sound bustle (connected to door)
  let bustleAudioGroup = new THREE.Group();
  bustleAudioGroup.position.set(250,0,0);
  
  const localAudioBustle = new THREE.PositionalAudio(audioListener);
  const audioLoader3 = new THREE.AudioLoader();
  audioLoader3.load( './assets/hospitalBackground.mp3', function( buffer ) {
    localAudioBustle.setBuffer(buffer);
    localAudioBustle.setRefDistance(30);
    localAudioBustle.setVolume(2);
    localAudioBustle.play();
  });
  //my3DModel.add(localAudioBustle);
  bustleAudioGroup.add(localAudioBustle);
  scene.add(bustleAudioGroup);
}

//add ambient light 242, 237, 222
let ambientLight = new THREE.AmbientLight("rgb(57,80,10)", 0.8);
// ambientLight.castShadow = true;
scene.add(ambientLight);

let myDirectionalLight = [];
let myDirectionalLightHelper = [];
for (let i=0; i<5; i++){
  myDirectionalLight[i] = new THREE.DirectionalLight("rgb(50,50,50)", 1);
  myDirectionalLight[i].position.set((-250+(100*i)), 100, 0);
  myDirectionalLight[i].lookAt((-250+(100*i)), 0, 0);
  scene.add(myDirectionalLight[i]);
  myDirectionalLight[i].castShadow = true;
  myDirectionalLight[i].shadow.mapSize.width = 512; // default
  myDirectionalLight[i].shadow.mapSize.height = 512; // default
  myDirectionalLight[i].shadow.camera.near = 0.5; // default
  myDirectionalLight[i].shadow.camera.far = 500; // default
  //add directional light helper, comment out when done
  // myDirectionalLightHelper[i] = new THREE.DirectionalLightHelper( myDirectionalLight[i], 10 );
  // scene.add(myDirectionalLightHelper[i]);
};

let my3DModel = new THREE.Group();
my3DModel.position.set(0,0,0);
let loader = new GLTFLoader();
loader.load( './la_night_city.glb',
 ( object ) => {
  console.log(object)
  object.scene.scale.set(30,30,30);
  object.scene.position.set(50,0,-400);
  object.scene.rotateY(120);
  object.scene.receiveShadow = true;
  object.scene.castShadow = true;
  object.scene.rotateY(1.43);
  my3DModel.add(object.scene);
	scene.add(my3DModel);
});

let waterModel = new THREE.Group();
waterModel.position.set(0,0,0);
loader.load( './water_waves.glb',
 ( object ) => {
  console.log(object)
  object.scene.scale.set(1,1,1);
  object.scene.position.set(0,0,0);
  object.scene.rotateY(120);
  object.scene.receiveShadow = true;
  object.scene.castShadow = true;
  object.scene.rotateY(1.43);
  waterModel.add(object.scene);
	scene.add(waterModel);
});


function loop() {
  //rotate for vertigo effect
  // floorMesh.rotateY(0.001);
  // floorMesh.rotateX(0.001);
  waterModel.rotateX(rotationSpeed);
  waterModel.rotateY(rotationSpeed-0.0001);
  // finally, take a picture of the scene and show it in the <canvas>
  renderer.render(scene, camera);

  window.requestAnimationFrame(loop); // pass the name of your loop function into this function
}
loop();
addSpatialAudio();



