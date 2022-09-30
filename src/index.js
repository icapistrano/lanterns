import './css/style.css';

import { SceneManager } from './components/SceneManager.js';

let sceneManager;

function init() {
  sceneManager = new SceneManager();
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  sceneManager.update();
}

init();