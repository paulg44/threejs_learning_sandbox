import * as THREE from "three";

// Build the cube
export const createCube = (color = 0x00ff00, shininess = 1) => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({
    color: color,
    shininess: shininess,
  });
  const cube = new THREE.Mesh(geometry, material);
  return cube;
};
