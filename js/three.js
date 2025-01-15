import { setupScene } from './three/setup.js';
import { createCube } from './three/objects.js';
import { animate } from './three/animate.js';

const { scene, camera, renderer } = setupScene();
const cube = createCube();
scene.add(cube);
animate(renderer, scene, camera, cube);
