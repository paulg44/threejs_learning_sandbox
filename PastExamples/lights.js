// Lights section from three.js manual

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { RectAreaLightUniformsLib } from "three/addons/lights/RectAreaLightUniformsLib.js";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper.js";

function main() {
  // Set up canvas
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGL1Renderer({ antialias: true, canvas });
  RectAreaLightUniformsLib.init();

  //   Camera options
  const fov = 45;
  const aspect = 2;
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  //   Camera Position
  camera.position.set(0, 10, 20);

  //   Orbit Controls
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.update();

  //   Create scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("black");

  //   Load Texture
  const planeSize = 40;

  const loader = new THREE.TextureLoader();
  const texture = loader.load(
    "https://threejs.org/manual/examples/resources/images/checker.png"
  );
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.NearestFilter;
  texture.colorSpace = THREE.SRGBColorSpace;
  const repeats = planeSize / 2;
  texture.repeat.set(repeats, repeats);

  const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
  const planeMat = new THREE.MeshStandardMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(planeGeo, planeMat);
  mesh.rotation.x = Math.PI * -0.5;
  scene.add(mesh);

  //   Add Cube
  {
    const cubeSize = 4;
    const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMat = new THREE.MeshStandardMaterial({ color: "#8ac" });
    const mesh = new THREE.Mesh(cubeGeo, cubeMat);
    mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
    scene.add(mesh);
  }

  // Add Sphere
  {
    const sphereRadius = 3;
    const sphereWidthDivisions = 32;
    const sphereHeightDivisions = 16;
    const sphereGeo = new THREE.SphereGeometry(
      sphereRadius,
      sphereWidthDivisions,
      sphereHeightDivisions
    );
    const sphereMat = new THREE.MeshStandardMaterial({ color: "#ca8" });
    const mesh = new THREE.Mesh(sphereGeo, sphereMat);
    mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
    scene.add(mesh);
  }

  //   GUI Helper to change color etc
  class ColorGUIHelper {
    constructor(object, prop) {
      this.object = object;
      this.prop = prop;
    }
    get value() {
      return `#${this.object[this.prop].getHexString()}`;
    }
    set value(hexString) {
      this.object[this.prop].set(hexString);
    }
  }
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

  function makeXYZGUI(gui, vector3, name, onChangeFn) {
    const folder = gui.addFolder(name);
    folder.add(vector3, "x", -10, 10).onChange(onChangeFn);
    folder.add(vector3, "y", 0, 10).onChange(onChangeFn);
    folder.add(vector3, "z", -10, 10).onChange(onChangeFn);
    folder.open();
  }

  {
    //   Lighting
    const color = 0xffffff;
    // Hemisphere lighting variables
    // const skyColor = 0xb1e1ff;
    // const groundColor = 0xb97a20;
    const intensity = 5;
    const width = 12;
    const height = 4;
    const light = new THREE.SpotLight(color, intensity, width, height);
    light.position.set(0, 10, 0);
    light.target.position.set(0, 10, 0);
    light.rotation.x = THREE.MathUtils.degToRad(-90);
    scene.add(light);
    // scene.add(light.target);

    const helper = new RectAreaLightHelper(light);
    scene.add(helper);

    // function updateLight() {
    //   light.target.updateMatrixWorld();
    //   helper.update();
    // }

    // updateLight();

    const gui = new GUI();
    // Hemisphere GUI
    // gui.addColor(new ColorGUIHelper(light, "color"), "value").name("skyColor");
    // gui
    //   .addColor(new ColorGUIHelper(light, "groundColor"), "value")
    //   .name("groundColorColor");
    gui.addColor(new ColorGUIHelper(light, "color"), "value").name("color");
    gui.add(light, "intensity", 0, 10, 0.01);
    gui.add(light, "width", 0, 20);
    gui.add(light, "height", 0, 20);
    // gui.add(light, "distance", 0, 40).onChange(updateLight);
    gui
      .add(new DegRadHelper(light.rotation, "x"), "value", -180, 180)
      .name("x rotation");
    gui
      .add(new DegRadHelper(light.rotation, "y"), "value", -180, 180)
      .name("y rotation");
    gui
      .add(new DegRadHelper(light.rotation, "z"), "value", -180, 180)
      .name("z rotation");
    // gui
    //   .add(new DegRadHelper(light, "angle"), "value", 0, 90)
    //   .name("angle")
    //   .onChange(updateLight);
    // gui.add(light, "penumbra", 0, 1, 0.01);
    // gui.add(light.target.position, "x", -10, 10);
    // gui.add(light.target.position, "z", -10, 10);
    // gui.add(light.target.position, "y", 0, 10);
    makeXYZGUI(gui, light.position, "position");
    // makeXYZGUI(gui, light.target.position, "target", updateLight);
  }

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

  function render() {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
