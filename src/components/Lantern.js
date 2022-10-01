import { 
  Group,
  CircleGeometry,
  CylinderGeometry, 
  MeshBasicMaterial, 
  Mesh, 
  TextureLoader, 
  DoubleSide, 
  ShaderMaterial,
  Color,
} from 'three';

import paper from '../assets/paper.jpg';
import lanternVertexShader from '../shaders/lantern/vertex.glsl';
import lanternFragmentShader from '../shaders/lantern/fragment.glsl';


export class Lantern {
  constructor() {
    this.radTop = 4;
    this.radBtm = 1.7,
    this.height = 8;
    this.radSegments = 8;
    this.heightSegments = 1;
    this.openEnded = true;

    this.red = new Color(0xB30303);
    this.orange = new Color(0xE8AE00);

    this.mesh = new Group();

    this.init();
  }

  init() {
    this.body = this.createBody();
    this.top = this.createTop();

    this.mesh.add(this.body)
    this.mesh.add(this.top);
  }

  createTop() {
    const geometry = new CircleGeometry(this.radTop, this.radSegments);
    const material = new MeshBasicMaterial({
      map: new TextureLoader().load(paper),
      side: DoubleSide,
      color: this.red
    });

    const mesh = new Mesh(geometry, material);
    mesh.rotateX(Math.PI / 2);
    mesh.position.setY(this.height/2);
    return mesh;
  }

  createBody() {
    const geometry = new CylinderGeometry(this.radTop, this.radBtm, this.height, this.radSegments, this.heightSegments, this.openEnded);
    const material = new ShaderMaterial({
      vertexShader: lanternVertexShader,
      fragmentShader: lanternFragmentShader,
      uniforms: {
        colour1: { value: this.orange },
        colour2: { value: this.red },
        paperTexture: { value:new TextureLoader().load(paper)}
      },
      transparent: true,
      side: DoubleSide
    })
  
    return new Mesh(geometry, material);
  }

  update() {
    
  }
}