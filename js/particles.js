const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

const logo = document.querySelector(".logo-img");

function resizeCanvas() {
  const rect = logo.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 2;
    this.speedY = (Math.random() - 0.5) * 2;

    this.life = Math.random() * 100;

    const colors = ["#00ffff", "#ff00cc", "#b300ff"];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life--;

    if (this.life <= 0) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;

    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;

    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// crear partículas
for (let i = 0; i < 50; i++) {
  particles.push(new Particle());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.globalCompositeOperation = "lighter"; // 🔥 glow real

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}

animate();