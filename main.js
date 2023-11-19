// Main JavaScript File

import * as THREE from "three";

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

// Build the cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
// Add cube to scene
scene.add(cube);

// Set camera position
camera.position.z = 4;

// Rendering the scene
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.03;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
