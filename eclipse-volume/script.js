const sun = document.getElementById("sun");
const moon = document.getElementById("moon");
const display = document.getElementById("volumeDisplay");
const sky = document.getElementById("sky");

let dragging = false;
let offsetX, offsetY;

const getCenter = (el) => {
  const rect = el.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
    r: rect.width / 2
  };
};

const getOverlapArea = (d, r) => {
  if (d >= 2 * r) return 0;
  if (d <= 0) return Math.PI * r * r;
  const part1 = r * r * Math.acos(d / (2 * r));
  const part2 = d / 2 * Math.sqrt(4 * r * r - d * d);
  return 2 * part1 - part2;
};

const updateVolume = () => {
  const sunC = getCenter(sun);
  const moonC = getCenter(moon);
  const dx = sunC.x - moonC.x;
  const dy = sunC.y - moonC.y;
  const d = Math.sqrt(dx * dx + dy * dy);
  const r = sunC.r;

  const overlap = getOverlapArea(d, r);
  const maxArea = Math.PI * r * r;
  const volume = overlap / maxArea * 100;

  display.textContent = `Volume: ${volume.toFixed(2)}%`;

  const darkness = overlap / maxArea;
  const rCol = Math.floor(135 - 100 * darkness);
  const gCol = Math.floor(206 - 100 * darkness);
  const bCol = Math.floor(235 - 150 * darkness);
  sky.style.backgroundColor = `rgb(${rCol}, ${gCol}, ${bCol})`;
};

const setMoonPosition = (x, y) => {
  const r = moon.offsetWidth / 2;
  moon.style.left = `${x - r}px`;
  moon.style.top = `${y - r}px`;
  updateVolume();
};

// Mouse events
moon.addEventListener("mousedown", (e) => {
  dragging = true;
  offsetX = e.offsetX;
  offsetY = e.offsetY;
});

document.addEventListener("mouseup", () => dragging = false);
document.addEventListener("mousemove", (e) => {
  if (!dragging) return;
  setMoonPosition(e.clientX - offsetX + moon.offsetWidth / 2, e.clientY - offsetY + moon.offsetHeight / 2);
});

// Touch events
moon.addEventListener("touchstart", (e) => {
  dragging = true;
  const rect = moon.getBoundingClientRect();
  offsetX = e.touches[0].clientX - rect.left;
  offsetY = e.touches[0].clientY - rect.top;
});

document.addEventListener("touchend", () => dragging = false);
document.addEventListener("touchmove", (e) => {
  if (!dragging) return;
  setMoonPosition(
    e.touches[0].clientX - offsetX + moon.offsetWidth / 2,
    e.touches[0].clientY - offsetY + moon.offsetHeight / 2
  );
});

// Initialize moon position
window.addEventListener("load", () => {
  const sunC = getCenter(sun);
  setMoonPosition(sunC.x - 250, sunC.y);
});
