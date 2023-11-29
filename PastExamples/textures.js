// Textures from three.js

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

  // ADD CUBE
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  const cubes = [];

  const loader = new THREE.TextureLoader();
  loader.load(
    "https://threejs.org/manual/examples/resources/images/wall.jpg",
    (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;

      const material = new THREE.MeshBasicMaterial({ map: texture });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      cubes.push(cube);
    }
  );

  //   const materials = [
  //     new THREE.MeshBasicMaterial({
  //       map: loadColorTexture("resources/images/flower-1.jpg"),
  //     }),
  //     new THREE.MeshBasicMaterial({
  //       map: loadColorTexture("resources/images/flower-2.jpg"),
  //     }),
  //     new THREE.MeshBasicMaterial({
  //       map: loadColorTexture("resources/images/flower-3.jpg"),
  //     }),
  //     new THREE.MeshBasicMaterial({
  //       map: loadColorTexture("resources/images/flower-4.jpg"),
  //     }),
  //     new THREE.MeshBasicMaterial({
  //       map: loadColorTexture("resources/images/flower-5.jpg"),
  //     }),
  //     new THREE.MeshBasicMaterial({
  //       map: loadColorTexture("resources/images/flower-6.jpg"),
  //     }),
  //   ];

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }

    return needResize;
  }

  function loadColorTexture(path) {
    const texture = loader.load(path);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  //   Cube spin timings
  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    cubes.forEach((cube, ndx) => {
      const speed = 0.2 + ndx * 0.1;
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
