export function animate(renderer, scene, camera, cube) {
    function animationLoop() {
      requestAnimationFrame(animationLoop);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animationLoop();
  }
  