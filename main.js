import * as THREE from 'three';
import { color } from 'three/tsl';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight,
  0.1, 1000 );

const camera_s = new THREE.OrthographicCamera(75, window.innerWidth / window.innerHeight,
  0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth,
  window.innerHeight 
);
renderer.setAnimationLoop (animate);
document.body.appendChild(
  renderer.domElement
);
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color:0x00ff00});
const cube = new THREE.Mesh(geometry, material);

camera.position.z = 5;
camera_s.position.z = 10;

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render( scene, camera);
  setTimeout(() => {
    renderer.render(scene, camera_s);
  }, 10000);
}