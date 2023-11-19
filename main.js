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

// Cube
const cube = createCube();
cube.position.x = -2;
scene.add(cube);

const cubeColor = 0xfffff;
const cubeIntensity = 3;
const cubeLighting = new THREE.DirectionalLight(cubeColor, cubeIntensity);
cubeLighting.position.set(-1, 2, 4);
scene.add(cubeLighting);

const sphere = createSphere();
sphere.position.x = 2;
scene.add(sphere);

// Add lighting
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

camera.position.z = 5;

const animate = () => {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
};

animate();
