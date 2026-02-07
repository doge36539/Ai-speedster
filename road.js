export class Road {
    constructor() {
        this.segments = [];
        this.segmentLength = 200;
        this.roadWidth = 2000;
        this.totalLength = 1000;

        for (let i = 0; i < this.totalLength; i++) {
            this.segments.push({
                z: i * this.segmentLength,
                curve: Math.sin(i / 20) * 1.5,
                color: Math.floor(i / 5) % 2 ? '#444' : '#3a3a3a'
            });
        }
    }

    project(p, camX, camY, camZ, width, height) {
        const camD = 0.8; 
        const scale = camD / (p.z - camZ);
        return {
            x: (1 + scale * (p.x - camX)) * width / 2,
            y: (1 - scale * (p.y - camY)) * height / 2,
            w: scale * this.roadWidth * width / 2
        };
    }
}
