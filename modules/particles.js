export function particles() {
  const canvas = document.getElementById("particles");
  if(!canvas) return;
  const ctx = canvas.getContext("2d", { alpha: true });
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let dpr = Math.max(1, window.devicePixelRatio || 1);
  let w, h, particles;
  let meteors = [];
  let nextSpawn = 0;
  const MAX_METEORS = 2;

  function resize() {
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    init(); meteors = []; nextSpawn = performance.now() + 800;
  }

  function init() {
    const count = prefersReduced ? 20 : Math.max(40, Math.floor((w * h) / 80000));
    particles = new Array(count).fill(0).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.06,
      vy: (Math.random() - 0.2) * 0.06,
      c: Math.random() < 0.7 ? "rgba(0,255,255,0.35)" : "rgba(192,192,192,0.25)"
    }));
  }

  function step() {
    if (!document.body.contains(canvas)) return;
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      if (!prefersReduced) { p.x += p.vx; p.y += p.vy; }
      if (p.x < -5) p.x = w + 5; if (p.x > w + 5) p.x = -5;
      if (p.y < -5) p.y = h + 5; if (p.y > h + 5) p.y = -5;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = p.c; ctx.fill();
    }
    if (!prefersReduced) { drawMeteors(); scheduleMeteors(); }
    if (!prefersReduced) requestAnimationFrame(step); else stepOnce = true;
  }

  function spawnMeteor() {
    const fromLeft = Math.random() > 0.5;
    const startX = fromLeft ? -40 : Math.random() * (w * 0.3);
    const startY = Math.random() * (h * 0.35) - 40;
    const speed = 9 + Math.random() * 6;
    const angle = (fromLeft ? 0.98 : 1.05) * Math.PI / 4; // downward diagonal
    meteors.push({
      x: startX, y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0, maxLife: 900 + Math.random() * 400
    });
  }

  function scheduleMeteors() {
    const now = performance.now();
    if (now >= nextSpawn && meteors.length < MAX_METEORS) {
      const n = 1 + (Math.random() > 0.6 ? 1 : 0);
      for (let i = 0; i < n; i++) spawnMeteor();
      nextSpawn = now + 1600 + Math.random() * 2600;
    }
  }

  function drawMeteors() {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    meteors = meteors.filter(m => m.life < m.maxLife && m.x < w + 80 && m.y < h + 80);
    for (const m of meteors) {
      m.x += m.vx; m.y += m.vy; m.life += 16;
      const len = 60 + Math.random() * 30;
      const tailX = m.x - (m.vx / Math.hypot(m.vx, m.vy)) * len;
      const tailY = m.y - (m.vy / Math.hypot(m.vx, m.vy)) * len;
      const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
      grad.addColorStop(0, 'rgba(255,255,255,0.95)');
      grad.addColorStop(0.3, 'rgba(120,220,255,0.9)');
      grad.addColorStop(1, 'rgba(0,180,255,0.0)');
      ctx.strokeStyle = grad; ctx.lineWidth = 2.2; ctx.lineCap = 'round';
      ctx.shadowColor = 'rgba(120,220,255,0.9)'; ctx.shadowBlur = 12;
      ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(tailX, tailY); ctx.stroke();
    }
    ctx.restore();
  }

  window.addEventListener("resize", resize, { passive: true });
  resize();
  if (!prefersReduced) requestAnimationFrame(step); else step();
}