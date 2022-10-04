import './css/style.css';

import { SceneManager } from './components/SceneManager.js';

let sceneManager;

function init() {
  sceneManager = new SceneManager();
  animate();
}

function animate(t) {
  requestAnimationFrame(animate);
  sceneManager.update(t/10000);
}

init();