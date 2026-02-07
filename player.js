export class Player {
    constructor() {
        this.x = 0; // -1 to 1 (left to right of road)
        this.speed = 0;
        this.maxSpeed = 250;
        this.accel = 2;
        this.friction = 0.97;
        this.steerPower = 0.04;
    }

    update(keys) {
        if (keys['ArrowUp'] || keys['w']) this.speed += this.accel;
        else this.speed *= this.friction;

        if (keys['ArrowLeft'] || keys['a']) this.x -= this.steerPower * (this.speed / 150);
        if (keys['ArrowRight'] || keys['d']) this.x += this.steerPower * (this.speed / 150);

        this.speed = Math.max(0, Math.min(this.speed, this.maxSpeed));
    }
}
