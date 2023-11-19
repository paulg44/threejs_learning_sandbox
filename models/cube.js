import * as THREE from "three";

// Build the cube
export const createCube = (color = 0x00ff00) => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({ color: color });
  const cube = new THREE.Mesh(geometry, material);
  return cube;
};
