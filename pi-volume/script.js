const pi =
  "3.14159265358979323846264338327950288419716939937510" +
  "58209749445923078164062862089986280348253421170679";

const input = document.getElementById("input");
const fill = document.getElementById("fill");
const percent = document.getElementById("percent");

input.addEventListener("input", () => {
  const val = input.value;

  if (val !== pi.slice(0, val.length)) {
    input.style.borderColor = "red";
    input.value = "";
    fill.style.width = "0%";
    percent.textContent = "Volume: 0%";
    return;
  }

  input.style.borderColor = "#0f0";

  const digitsEntered = val.replace(".", "").length;
  const volume = Math.min(digitsEntered, 100);
  fill.style.width = `${volume}%`;
  percent.textContent = `Volume: ${volume}%`;

  if (volume === 100) {
    input.style.backgroundColor = "#0f03";
    percent.textContent += " 🔊 MAX!";
  }
});
