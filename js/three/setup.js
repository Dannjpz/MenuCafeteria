import { WebGLRenderer, Scene, PerspectiveCamera } from 'three';

export function setupScene() {
  const scene = new Scene();
  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("3d-container").appendChild(renderer.domElement);

  return { scene, camera, renderer };
}
