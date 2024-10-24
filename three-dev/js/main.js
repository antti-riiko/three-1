import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let container, camera, scene, renderer, cube, torusKnot, cylinder, controls;

init();

function init() {
  container = document.createElement("div");
  document.body.appendChild(container);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animate);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
  });

  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.2, 100, 16);
  const torusKnotMaterial = new THREE.MeshPhongMaterial({
    color: 0xffff00,
  });

  torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
  scene.add(torusKnot);

  const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
  const cylinderMaterial = new THREE.MeshPhongMaterial({ color: 0xff00ff });

  cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
  scene.add(cylinder);

  camera.position.set(2, 2, 2);

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  camera.lookAt(axesHelper.position);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  scene.add(directionalLight);

  const light = new THREE.AmbientLight(0x404040);
  scene.add(light);

  cube.position.set(0, 1, 0);
  torusKnot.position.set(2, 0, 0);
  cylinder.position.set(-2, 0, 0);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.screenSpacePanning = false;

  controls.minDistance = 1;
  controls.maxDistance = 5;
}

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  torusKnot.rotation.x += 0.02;
  torusKnot.rotation.y += 0.02;

  cylinder.rotation.x += 0.04;
  cylinder.rotation.y += 0.04;

  controls.update();

  renderer.render(scene, camera);
}

window.addEventListener("resize", resize, false);

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
