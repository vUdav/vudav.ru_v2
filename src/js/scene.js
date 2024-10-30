import * as THREE from 'three';

export default () => {
  const sceneEl = document.getElementById('scene');

  const size = 10;

  const scene = new THREE.Scene();
  scene.position.y = -4;
  scene.rotation.z = Math.PI / 4;
  scene.rotation.x = - Math.PI / 4;

  const camera = new THREE.PerspectiveCamera(50, sceneEl.offsetWidth / sceneEl.offsetHeight, 0.1, 1000);

  const light = new THREE.PointLight(0xffffff, 200, 0, 2);
  light.position.set(6, -2, 1);
  scene.add(light);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(sceneEl.offsetWidth, sceneEl.offsetHeight);
  sceneEl.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(1, 1, 0.05);
  const material = new THREE.MeshStandardMaterial({ color: '#000', roughness: 0.6, metalness: 0.3 })

  const cubes = [];
  const gap = 0.15;
  for (let i = 0; i <= size; i++) {
    const topOffset = i * (1 + gap)
    for (let k = 0; k <= size; k++) {
      const cube = new THREE.Mesh(geometry, material);
      const leftOffset = k * (1 + gap)
      cube.position.set(topOffset, leftOffset, 0);
      cubes.push({
        gridPosition: [i, k],
        cube
      });
    }
  }

  cubes.forEach(({ cube }) => scene.add(cube));

  camera.position.z = 15;

  let time = 0;
  let timeSpeed = 0.05;
  let wavePower = 0.1;
  let waveSpeed = 0.0005;
  let waveDirection = 1;

  function animate() {
    requestAnimationFrame(animate);

    time += timeSpeed;
    wavePower += waveSpeed * waveDirection;
    if (wavePower > 0.5 || wavePower < 0.1) {
      waveDirection *= -1;
    }

    cubes.forEach(({ gridPosition, cube }) => {
      const [i, k] = gridPosition;
      cube.position.z = Math.sin(time + (i + k) * 0.5) * wavePower;
    });

    renderer.render(scene, camera);
  }
  animate();

  // Обработчик изменения размера окна
  window.addEventListener('resize', () => {
    camera.aspect = sceneEl.offsetWidth / sceneEl.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(sceneEl.offsetWidth, sceneEl.offsetHeight);
  });
}