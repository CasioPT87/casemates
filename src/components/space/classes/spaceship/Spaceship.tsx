import { CANVAS_SIZE, PhaseClass } from '../classes';
import spaceshipImage from '../../../../assets/images/spaceship.png';
import type { PhaseManager } from '../../../../assets/javascript/PhaseManager';

export class Spaceship extends PhaseClass {

  height:number;
  width:number;
  _x:number;
  _y:number;
  x:number;
  y:number;
  speedX:number;
  speedY:number;
  active: boolean;
  image: HTMLImageElement | null;
  phases: PhaseManager | null;

  constructor() {
    super();
    this.height = 60;
    this.width = 140;
    this._x = CANVAS_SIZE.width / 2 - this.width / 2;
    this._y = CANVAS_SIZE.height / 2 - this.height / 2;
    this.x = this._x;
    this.y = this._y;
    this.speedX = 0;
    this.speedY = 0;
    this.active = false;
    this.image = null; 
    this.phases = null;
  }

  initialize(): void {
    this.setPhase(1);
  }

  vibrate() {
    this.getNewSpeed();
    this.x = this._x + this.speedX;
    this.y = this._y + this.speedY;
  }

  land() {
    this.setLandingSpeed();
    this.setLandingImage()
    this._x += this.speedX;
    this._y += this.speedY;
    this.x = this._x;
    this.y = this._y;
    if (this.hasLanded()) {
      this.setPhase(3);
    }
  }

  setLandingImage() {
    // TODO
  }

  hasLanded() {
    return this.y + this.height >= CANVAS_SIZE.height;
  }

  setLandingSpeed() {
    this.speedX = 0;
    this.speedY = 2;
  }

  updatePosition(): void {
    const { phases } = this;
    console.log(this.phases)
    if (phases) {
      if (phases.isPhase('approaching')) this.vibrate();
      if (phases.isPhase('landing')) this.land();
    }
  }

  getNewSpeed(range: number = 8): void {
    const min = -range / 2
    this.speedX = Math.random() * range + min;
    this.speedY = Math.random() * range + min;
  }

  loadImage = (): Spaceship => {
    this.image = new Image();
    this.image.onload = () => {
      this.initialize()
    };
    this.image.src = spaceshipImage;
    return this;
  }
}

const spaceship: Spaceship = new Spaceship().loadImage().setPhase(0);

export default spaceship;
