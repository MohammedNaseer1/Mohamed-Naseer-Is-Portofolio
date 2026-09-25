// ---- Mobile nav toggle -----------------------------------------
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".topnav nav");
if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const open = nav.style.display === "flex";
    nav.style.display = open ? "none" : "flex";
    nav.style.flexDirection = "column";
    navToggle.setAttribute("aria-expanded", String(!open));
  });
}

// ---- Hero sparkline (canvas line chart, no library needed) -----
function drawSparkline() {
  const canvas = document.getElementById("sparkline");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width, h = canvas.height;

  // sample "forecast vs actual" style series
  const points = 24;
  const actual = [];
  const forecast = [];
  let a = h * 0.6, f = h * 0.62;
  for (let i = 0; i < points; i++) {
    a += (Math.random() - 0.5) * 40;
    f += (Math.random() - 0.45) * 26;
    actual.push(Math.max(40, Math.min(h - 40, a)));
    forecast.push(Math.max(40, Math.min(h - 40, f)));
  }

  const styles = getComputedStyle(document.documentElement);
  const accent = styles.getPropertyValue("--accent").trim() || "#3FA796";
  const line = styles.getPropertyValue("--line").trim() || "#26302E";
  const dim = styles.getPropertyValue("--text-dim").trim() || "#9AA6A2";

  function drawLine(series, color, width) {
    ctx.beginPath();
    series.forEach((y, i) => {
      const x = (i / (points - 1)) * w;
      const yy = h - y;
      i === 0 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy);
    });
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
  }

  function render(progress) {
    ctx.clearRect(0, 0, w, h);

    // gridlines
    ctx.strokeStyle = line;
    ctx.lineWidth = 1;
    for (let gy = 40; gy < h; gy += 60) {
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(w, gy);
      ctx.stroke();
    }

    const visibleCount = Math.max(2, Math.floor(points * progress));
    drawLine(forecast.slice(0, visibleCount), dim, 1.5);
    drawLine(actual.slice(0, visibleCount), accent, 2.5);

    // last point marker
    const lastX = ((visibleCount - 1) / (points - 1)) * w;
    const lastY = h - actual[visibleCount - 1];
    ctx.beginPath();
    ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
    ctx.fillStyle = accent;
    ctx.fill();
  }

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    render(1);
    return;
  }

  let start = null;
  const duration = 1400;
  function frame(t) {
    if (!start) start = t;
    const progress = Math.min(1, (t - start) / duration);
    render(progress);
    if (progress < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
drawSparkline();

