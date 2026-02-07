import { Player } from './player.js';
import { Road } from './road.js';

const canvas = document.getElementById('g');
const ctx = canvas.getContext('2d');
const player = new Player();
const road = new Road();

let position = 0;
const keys = {};

window.onkeydown = e => keys[e.key] = true;
window.onkeyup = e => keys[e.key] = false;

function loop() {
    player.update(keys);
    position += player.speed;

    // Clear and draw sky/ground
    ctx.fillStyle = '#111'; ctx.fillRect(0, 0, 800, 600);
    
    let startNode = Math.floor(position / road.segmentLength);
    let x = 0, dx = 0;

    for (let n = startNode; n < startNode + 80; n++) {
        let s = road.segments[n % road.totalLength];
        let p1 = road.project({x: player.x * road.roadWidth - x, y: 1500, z: n * road.segmentLength}, 0, 0, position, 800, 600);
        let p2 = road.project({x: player.x * road.roadWidth - x - dx, y: 1500, z: (n+1) * road.segmentLength}, 0, 0, position, 800, 600);
        
        x += dx; dx += s.curve;

        if (p1.y <= p2.y) continue;

        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.moveTo(p1.x - p1.w, p1.y); ctx.lineTo(p1.x + p1.w, p1.y);
        ctx.lineTo(p2.x + p2.w, p2.y); ctx.lineTo(p2.x - p2.w, p2.y);
        ctx.fill();
    }

    // Draw simple Car Sprite
    ctx.fillStyle = '#f0f';
    ctx.fillRect(370, 520, 60, 30);

    document.getElementById('speed').innerText = Math.floor(player.speed);
    document.getElementById('dist').innerText = Math.floor(position / 100);

    requestAnimationFrame(loop);
}
loop();
