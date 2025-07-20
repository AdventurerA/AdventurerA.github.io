
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    initStars();
    initGalaxies();
});

// Star class
class Star {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.5;
        this.fade = (Math.random() * 0.005 + 0.001);
        this.color = ["#ffffff", "#ffe9c4", "#d4fbff"][Math.floor(Math.random() * 3)];
    }
    update() {
        this.opacity += this.fade;
        if (this.opacity <= 0.5 || this.opacity >= 1) this.fade *= -1;
    }
    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

// Galaxy class
class Galaxy {
    constructor(x, y, radius, arms, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.arms = arms;
        this.color = color;
        this.angle = 0;
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        for (let i = 0; i < this.arms; i++) {
            let angle = (Math.PI * 2 / this.arms) * i;
            for (let j = 0; j < this.radius; j += 2) {
                let x = Math.cos(angle + j * 0.05) * j;
                let y = Math.sin(angle + j * 0.05) * j;
                ctx.fillStyle = this.color;
                ctx.globalAlpha = 0.05;
                ctx.beginPath();
                ctx.arc(x, y, 1.5, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        ctx.restore();
        this.angle += 0.0005;
        ctx.globalAlpha = 1;
    }
}

// Milky Way band
function drawMilkyWay() {
    let gradient = ctx.createLinearGradient(0, h * 0.4, w, h * 0.6);
    gradient.addColorStop(0, "rgba(255,255,255,0.02)");
    gradient.addColorStop(0.5, "rgba(255,255,255,0.08)");
    gradient.addColorStop(1, "rgba(255,255,255,0.02)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, h * 0.4, w, h * 0.2);
}

let stars = [];
function initStars() {
    stars = [];
    for (let i = 0; i < 200; i++) {
        stars.push(new Star());
    }
}

let galaxies = [];
function initGalaxies() {
    galaxies = [
        new Galaxy(w * 0.25, h * 0.3, 80, 5, "#ffffff"),
        new Galaxy(w * 0.75, h * 0.7, 100, 6, "#aaccff")
    ];
}

function animate() {
    ctx.clearRect(0, 0, w, h);
    drawMilkyWay();
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    galaxies.forEach(galaxy => galaxy.draw());
    requestAnimationFrame(animate);
}

initStars();
initGalaxies();
animate();
