let volume = 0;
const pump = document.getElementById("pump");
const fill = document.getElementById("fill");
const percent = document.getElementById("percent");

function updateVolumeDisplay() {
  fill.style.width = `${volume}%`;
  percent.textContent = `Volume: ${volume.toFixed(0)}%`;
}

pump.addEventListener("click", () => {
  volume = Math.min(volume + 5, 100);
  updateVolumeDisplay();
});

setInterval(() => {
  if (volume > 0) {
    volume = Math.max(volume - 0.5, 0);
    updateVolumeDisplay();
  }
}, 100);
