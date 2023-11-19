// Main JS file

import * as THREE from "three";
import { createCube } from "./models/cube";
import { createSphere } from "./models/line";

// Set the scene
const scene = new THREE.Scene();
// 1 of 3 different types of camera, first attribute is FOV in degrees, 2nd is aspect ratio, almost always width/height. Last 2 are near & far clippings.
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Renderer instance, gives the size in which we want it to render on the screen
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const cube = createCube();
cube.position.x = -2;
scene.add(cube);

const sphere = createSphere();
sphere.position.x = 2;
scene.add(sphere);

camera.position.z = 5;

const animate = () => {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
};

animate();
