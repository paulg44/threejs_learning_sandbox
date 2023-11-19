// Draw Line Model

import * as THREE from "three";

// Drawing Lines
export const createSphere = () => {
  const geometry = new THREE.SphereGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const sphere = new THREE.Mesh(geometry, material);
  return sphere;
};
