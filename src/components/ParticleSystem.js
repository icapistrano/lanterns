import { 
  AdditiveBlending,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  NoBlending,
  NormalBlending,
  Points,
  PointsMaterial,
  TextureLoader,
  Vector3
} from "three";



export class ParticleSystem {
  constructor() {
    this.particleCount = 600;
    this.maxDistance = 500;
    this.pSize = 0.1;
    this.pColour = new Color(0xffffff);

    this.material = new PointsMaterial({
      color:this.pColour,
      size: this.pSize,
    })

    this.geometry = new BufferGeometry();
    this.geometry.setAttribute('position', new Float32BufferAttribute([], 3));

    this.points = new Points(this.geometry, this.material);

    this.particles = [];

    this.addParticles();
    this.updateGeometry();
  }

  addParticles() {
    for (let i=0; i<this.particleCount; i++) {
      this.particles.push({
        position: new Vector3(
          (Math.random() * this.maxDistance - (this.maxDistance / 2)) * 1,
          (Math.random() * this.maxDistance - (this.maxDistance / 2)) * 1,
          (Math.random() * this.maxDistance - (this.maxDistance / 2)) * 1),
        colour: new Color(Math.random(), Math.random(), Math.random()),
        alpha: Math.random(),
        life: 5,
        rotation: Math.random() * 2 * Math.PI,
      })
    }
  }

  updateGeometry() {
    const positions = [];

    for (let p of this.particles) {
      positions.push(p.position.x, p.position.y, p.position.z);
    }

    this.geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));

    this.geometry.attributes.position.needsUpdate = true;
  }
}