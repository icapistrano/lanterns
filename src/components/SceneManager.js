import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { 
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AxesHelper,
  Color,
} from 'three';

import { Lantern } from './Lantern';
import { ParticleSystem } from './ParticleSystem';

export class SceneManager {
  constructor() {
    this.canvas = document.getElementById('webgl-canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.scene = new Scene();

    // const ax = new AxesHelper(100);
    // this.scene.add(ax)

    this.camera = new PerspectiveCamera(75, this.canvas.width / this.canvas.height, 0.1, 1000);
    this.camera.position.set(50, -120, 70);

    this.camera.lookAt(this.scene.position);

    this.renderer = new WebGLRenderer({canvas:this.canvas, antialias:true});
    this.renderer.setSize(this.canvas.width, this.canvas.height);

    const controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.particleSystem = new ParticleSystem();
    this.scene.add(this.particleSystem.points);

    // demo
    this.lanterns = [];
    for (let i=0; i<10; i++) {
      const x = Math.random() * 150 - (150 / 2) * 1;
      const y = Math.random() * 50 - (50 / 2) * 1;
      const z = Math.random() * 150 - (150 / 2) * 1;
      const lantern = new Lantern(0.01, x, y, z);
      this.scene.add(lantern.mesh);
      this.lanterns.push(lantern);
    }
  }

  update(timeElapsed) {
    this.camera.updateProjectionMatrix();

    for (let lantern of this.lanterns) {
      lantern.update(timeElapsed);
    }

    this.renderer.render(this.scene, this.camera);
  }
}