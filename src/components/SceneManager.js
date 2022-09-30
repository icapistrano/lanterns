import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { 
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AxesHelper,
} from 'three';


export class SceneManager {
  constructor() {
    this.canvas = document.getElementById('webgl-canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.scene = new Scene();

    const ax = new AxesHelper(100);
    this.scene.add(ax)

    this.camera = new PerspectiveCamera(75, this.canvas.width / this.canvas.height, 0.1, 1000);
    this.camera.position.z = 100;

    this.renderer = new WebGLRenderer({canvas:this.canvas, antialias:true});
    this.renderer.setSize(this.canvas.width, this.canvas.height);

    const controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  update() {
    this.camera.updateProjectionMatrix();
    this.renderer.render(this.scene, this.camera);
  }
}