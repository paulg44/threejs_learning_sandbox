// Materials from three.js

import * as THREE from "three";

function main() {
  // Set up canvas
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGL1Renderer({ antialias: true, canvas });

  //   Camera options
  const fov = 75;
  const aspect = 2;
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  //   Camera Position
  camera.position.z = 2;

  //   Create scene
  const scene = new THREE.Scene();

  //   Lighting
  {
    const color = 0xfffff;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);

    scene.add(light);
  }

  // ADD CUBE
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  //   Function makes three cubes
  function makeInstance(geometry, color, roughness, x, flatShading) {
    const material = new THREE.MeshPhysicalMaterial({
      color,
      roughness,
      flatShading,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;
    return cube;
  }

  //   Each cube different color and position
  const cubes = [
    makeInstance(geometry, 0x44aa88, 0.01, 0, false),
    makeInstance(geometry, 0x8844aa, 0.5, -2, true),
    makeInstance(geometry, 0xaa8844, 0.9, 2, false),
  ];

  //   Cube spin timings
  function render(time) {
    time *= 0.001;

    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * 0.1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
      renderer.render(scene, camera);
    });

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

main();
