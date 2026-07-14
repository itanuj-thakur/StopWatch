const startBtn = document.getElementById("start-stop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const display = document.getElementById("display");

let startTime;
let elapsedTime = 0;
let intervalID;
let isRunning = false;

startBtn.addEventListener("click", toggleClock);
function updateClock() {
  elapsedTime = Date.now() - startTime;
  const seconds = Math.floor(elapsedTime / 1000) % 60;
  const minutes = Math.floor(elapsedTime / (1000 * 60)) % 60;
  const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  const milliseconds = elapsedTime % 1000;
  const hh = hours.toString().padStart(2, "0");
  const mm = minutes.toString().padStart(2, "0");
  const ss = seconds.toString().padStart(2, "0");
  const ms = milliseconds.toString().padStart(3, "0");
  const time = hh + ":" + mm + ":" + ss + ":" + ms;
  display.textContent = time;
}
function toggleClock() {
  if (isRunning) {
    isRunning = false;
    clearInterval(intervalID);
    startBtn.textContent = "▶";
  } else {
    startTime = Date.now()-elapsedTime;
    intervalID = setInterval(updateClock, 10);
    isRunning = true;
    startBtn.textContent = "⏸";
  }
}
