import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { mySphere } from "./mySphere.js";

let scene, camera, renderer;

function init() {
  // create a scene in which all other objects will exist
  scene = new THREE.Scene();

  // create a camera and position it in space
  let aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
  camera.position.z = 5; // place the camera in space
  camera.position.y = 5;
  camera.lookAt(0, 0, 0);

  // the renderer will actually show the camera view within our <canvas>
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  let gridHelper = new THREE.GridHelper(25, 25);
  scene.add(gridHelper);

  // add orbit controls
  let controls = new OrbitControls(camera, renderer.domElement);

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

  addSpheres();

  loop();
}

let sphere1, sphere2, sphere3;
const spheres = [];
function addSpheres() {
  sphere1 = new mySphere(1, "Alien_Flesh_001_color.jpg", "Alien_Flesh_001_disp.jpg", 1, scene);
  sphere2 = new mySphere(1, "Alien_Flesh_001_color.jpg", "Alien_Flesh_001_disp.jpg", 0.3, scene);
  sphere3 = new mySphere(1, "Alien_Flesh_001_color.jpg", "Alien_Flesh_001_disp.jpg", 0.6, scene);
  //constructor(myRadius,texture1, texture2, speed, scene)

  for ( let i = 0; i < 200; i ++ ) {
    
    //spheres[i] = new mySphere(1, "Alien_Flesh_001_color.jpg", "Alien_Flesh_001_disp.jpg", 0.1, scene);
    //scene.add( mesh );
    spheres.push( new mySphere(1, "Alien_Flesh_001_color.jpg", "Alien_Flesh_001_disp.jpg", 0.1, scene) );
  }

}

function loop() {
  sphere1.update();
  sphere2.update();
  sphere3.update();
  for (let i=0; i <= spheres.length; i++){
    console.log(spheres[i]);
    //spheres[i].update();
  }
  // finally, take a picture of the scene and show it in the <canvas>
  renderer.render(scene, camera);

  window.requestAnimationFrame(loop); // pass the name of your loop function into this function
}

init();
