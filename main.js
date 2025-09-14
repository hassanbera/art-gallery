import * as THREE from "three";
import { Reflector } from "three/examples/jsm/Addons.js";

const images = [
  "socrates.jpg",
  "stars.jpg",
  "wave.jpg",
  "spring.jpg",
  "mountain.jpg",
  "sunday.jpg",
];

const textureLoader = new THREE.TextureLoader();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const rootNode = new THREE.Object3D();
scene.add(rootNode);

const leftArrowImage = textureLoader.load(`left.png`);
const rightArrowImage = textureLoader.load(`right.png`);

const count = images.length;
for (let i = 0; i < count; i++) {
  const image = textureLoader.load(images[i]);

  const baseNode = new THREE.Object3D();
  baseNode.rotation.y = 2 * Math.PI * (i / count);

  const border = new THREE.Mesh (
    new THREE.BoxGeometry(3.2, 2.2, 0.005),
    new THREE.MeshStandardMaterial({ color: 0x303030})
  );
  border.position.z = -4;
  baseNode.add(border);

  const artwork = new THREE.Mesh(
    new THREE.BoxGeometry(3, 2, 0.01),
    new THREE.MeshStandardMaterial({map: image})
  );
  artwork.position.z = -4;
  baseNode.add(artwork);

  const leftArrow = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.3, 0.01),
    new THREE.MeshStandardMaterial({map: leftArrowImage, transparent:true})
  )
  leftArrow.position.set(2.9, 0, -4);
  baseNode.add(leftArrow);

  const rightArrow = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.3, 0.01),
    new THREE.MeshStandardMaterial({map: rightArrowImage, transparent:true})
  )
  rightArrow.position.set(-2.9,0,-4);
  baseNode.add(rightArrow);

  rootNode.add(baseNode);
}

const spotlight = new THREE.SpotLight(0xffffff, 100.0, 10, 0.65, 1);
spotlight.position.set(0, 5, 0);
spotlight.target.position.set(0, 1, -5);
scene.add(spotlight);
scene.add(spotlight.target);

const mirror = new Reflector (
  new THREE.CircleGeometry(40,64),
  {
    color: 0x505050,
    textureWidth: window.innerWidth * window.devicePixelRatio,
    textureHeight: window.innerHeight * window.devicePixelRatio,
  }
);

mirror.position.set(0, -1.1, 0);
mirror.rotateX(-Math.PI / 2);
scene.add(mirror);

function animate() {
  rootNode.rotation.y += 0.001;
  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
