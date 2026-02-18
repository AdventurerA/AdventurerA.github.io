const canvas = document.getElementById('stars');
if (!canvas) {
  console.error('Canvas #stars not found in DOM.');
}
const ctx = canvas ? canvas.getContext('2d') : null;
if (!ctx) {
  console.error('2D context not available.');
}

let w = 0, h = 0;

function resizeCanvas() {
  const dpr = Math.max(window.devicePixelRatio || 1, 1);
  w = Math.floor(window.innerWidth);
  h = Math.floor(window.innerHeight);

  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';

  canvas.width = Math.floor(w * dpr);
  canvas.height = Math.floor(h * dpr);

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  initStars();
  initGalaxies();
});

class Star {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.size = Math.random() * 1.5 + 0.5;
    this.opacity = Math.random() * 0.5 + 0.5;
    this.fade = (Math.random() * 0.005 + 0.001);
    const palette = ['#ffffff', '#ffe9c4', '#d4fbff'];
    this.color = palette[(Math.random() * palette.length) | 0];
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

class Galaxy {
  constructor(x, y, radius, arms, color) {
    this.x = x; this.y = y; this.radius = radius; this.arms = arms;
    this.color = color; this.angle = 0;
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    for (let i = 0; i < this.arms; i++) {
      const base = (Math.PI * 2 / this.arms) * i;
      for (let j = 0; j < this.radius; j += 2) {
        const x = Math.cos(base + j * 0.05) * j;
        const y = Math.sin(base + j * 0.05) * j;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.08;
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

function drawMilkyWay() {
  const grad = ctx.createLinearGradient(0, h * 0.35, w, h * 0.65);
  grad.addColorStop(0, 'rgba(255,255,255,0.015)');
  grad.addColorStop(0.5, 'rgba(255,255,255,0.09)');
  grad.addColorStop(1, 'rgba(255,255,255,0.015)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, h * 0.35, w, h * 0.30);
}

let stars = [];
function initStars() {
  stars = [];
  for (let i = 0; i < 200; i++) stars.push(new Star());
}

let galaxies = [];
function initGalaxies() {
  galaxies = [
    new Galaxy(w * 0.25, h * 0.30, 80, 5, '#ffffff'),
    new Galaxy(w * 0.75, h * 0.70, 100, 6, '#aaccff')
  ];
}

function animate() {
  ctx.clearRect(0, 0, w, h);
  drawMilkyWay();
  for (const s of stars) { s.update(); s.draw(); }
  for (const g of galaxies) g.draw();
  requestAnimationFrame(animate);
}

if (canvas && ctx) {
  resizeCanvas();
  initStars();
  initGalaxies();
  requestAnimationFrame(animate);
}
