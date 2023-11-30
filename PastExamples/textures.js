// Textures from three.js

import * as THREE from "three";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

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
  const texture = loader.load(
    "https://threejs.org/manual/examples/resources/images/wall.jpg"
  );
  texture.colorSpace = THREE.SRGBColorSpace;

  const material = new THREE.MeshBasicMaterial({ map: texture });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  cubes.push(cube);

  class DegRadHelper {
    constructor(obj, prop) {
      this.obj = obj;
      this.prop = prop;
    }
    get value() {
      return THREE.MathUtils.radToDeg(this.obj[this.prop]);
    }
    set value(v) {
      this.obj[this.prop] = THREE.MathUtils.degToRad(v);
    }
  }

  class StringToNumberHelper {
    constructor(obj, prop) {
      this.obj = obj;
      this.prop = prop;
    }
    get value() {
      return this.obj[this.prop];
    }
    set value(v) {
      this.obj[this.prop] = parseFloat(v);
    }
  }

  const wrapModes = {
    ClampToEdgeWrapping: THREE.ClampToEdgeWrapping,
    RepeatWrapping: THREE.RepeatWrapping,
    MirroredRepeatWrapping: THREE.MirroredRepeatWrapping,
  };

  function updateTexture() {
    texture.needsUpdate = true;
  }

  const gui = new GUI();
  gui
    .add(new StringToNumberHelper(texture, "wrapS"), "value", wrapModes)
    .name("texture.wrapS")
    .onChange(updateTexture);
  gui
    .add(new StringToNumberHelper(texture, "wrapT"), "value", wrapModes)
    .name("texture.wrapT")
    .onChange(updateTexture);
  gui.add(texture.repeat, "x", 0, 5, 0.01).name("texture.repeat.x");
  gui.add(texture.repeat, "y", 0, 5, 0.01).name("texture.repeat.y");
  gui.add(texture.offset, "x", -2, 2, 0.01).name("texture.offset.x");
  gui.add(texture.offset, "y", -2, 2, 0.01).name("texture.offset.y");
  gui.add(texture.center, "x", -0.5, 1.5, 0.01).name("texture.center.x");
  gui.add(texture.center, "y", -0.5, 1.5, 0.01).name("texture.center.y");
  gui
    .add(new DegRadHelper(texture, "rotation"), "value", -360, 360)
    .name("texture.rotation");

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
