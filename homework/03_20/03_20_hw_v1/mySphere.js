import * as THREE from "three";

export class mySphere {
  constructor(myRadius,texture1, texture2, speedY, scene) {
    let geo = new THREE.SphereGeometry(myRadius, 100, 100);
    let sphereMap = new THREE.TextureLoader().load(texture1);
    let sphereDMap = new THREE.TextureLoader().load(texture2);

    let mat = new THREE.MeshPhongMaterial({
      displacementMap: sphereDMap,
      displacementScale: 4,
      map: sphereMap
    });

    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.castShadow = true;
    this.mesh.position.set(Math.random() * 200 - 100, Math.random() * 3 - 0.5, Math.random() * 100 - 100);
    //centers it
    this.mesh.scale.x = this.mesh.scale.y = this.mesh.scale.z = Math.random() * 3 + 1;
    scene.add(this.mesh);

    this.frameCount = 0;
    this.speedY = speedY;
  }

  update() {
    this.frameCount++; 
    console.log(this.frameCount);
    this.mesh.position.y += Math.sin(this.frameCount / 5) * this.speedY; //this.speedY / 50;
    //Math.sin(frameCount / 5) * 0.5;
  }
}

//mesh.position.x = Math.random() * 200 - 100 ; //*1 goes flat
// mesh.position.y = Math.random() * 3 - 0.5;
// mesh.position.z = Math.random() * 100 - 100;
// mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;
// mesh.castShadow = true;
