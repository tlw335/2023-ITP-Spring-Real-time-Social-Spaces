import * as THREE from "three";

generateNoise = function(opacity,canvas) {
    var
    x, y,
    number,
    opacity = opacity || .2;
      ctx = canvas.getContext('2d');
    for ( x = 0; x < canvas.width; x++ ) {
       for ( y = 0; y < canvas.height; y++ ) {
          number = Math.floor( Math.random() * 60 );
  
          ctx.fillStyle = "rgba(" + number + "," + number + "," + number + "," + opacity + ")";
          ctx.fillRect(x, y, 1, 1);
       }
    }
 }
 
 
 
 var mesh;
 var scene = new THREE.Scene();
 
 var camera = new THREE.PerspectiveCamera(50, 500 / 400, 0.1, 1000);
 camera.position.z = 10;
 
 var renderer = new THREE.WebGLRenderer({ antialias: true });
 renderer.setSize(500, 400);
 document.body.appendChild(renderer.domElement);
 
 var canvas = document.createElement("canvas");
  
 canvas.width = 400;
 canvas.height = 400;
 
 
 generateNoise(.1, canvas);
 
 var texture = new THREE.Texture(canvas);
 texture.needsUpdate = true;
 
 var geometry = new THREE.SphereGeometry(3, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);
 var material = new THREE.MeshPhongMaterial({ map: texture, bumpMap: texture });
 
 var light = new THREE.PointLight( new THREE.Color("rgb(255,70,3)"), 2.5);
 var light2 = new THREE.PointLight( new THREE.Color("rgb(255,15,255)"), 4);
 light.position.set( 0, -100, 800 );
 light2.position.set( 50, 50, 900 );
 mesh = new THREE.Mesh(geometry, material);
 
 scene.add ( light );
 scene.add ( light2 );
 scene.add(mesh);
   
 var render = function () {
     requestAnimationFrame(render);
     mesh.rotation.y += 0.01;
     renderer.render(scene, camera);
 };
 
 render();
 
 
 
 