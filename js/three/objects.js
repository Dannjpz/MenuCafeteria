import { BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

export function createCube() {
  const geometry = new BoxGeometry();
  const material = new MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new Mesh(geometry, material);
  return cube;
}
