const startBtn = document.getElementById("start-stop");
const resetBtn = document.getElementById("reset");
const display = document.getElementById("display");
const lapBtn = document.getElementById("lap");
const list = document.getElementById("list");

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
  const centiseconds = Math.floor((elapsedTime % 1000) / 10);
  const hh = hours.toString().padStart(2, "0");
  const mm = minutes.toString().padStart(2, "0");
  const ss = seconds.toString().padStart(2, "0");
  const cs = centiseconds.toString().padStart(2, "0");
  const time = hh + ":" + mm + ":" + ss + ":" + cs;
  display.textContent = time;
}
function toggleClock() {
  if (isRunning) {
    startBtn.style.backgroundColor="greenyellow";
    lapBtn.disabled = true;
    isRunning = false;
    clearInterval(intervalID);
    startBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  } else {
    startBtn.style.backgroundColor="#ef4444";
    lapBtn.disabled = false;
    resetBtn.disabled = false;
    
    startTime = Date.now() - elapsedTime;
    updateClock();
    intervalID = setInterval(updateClock, 10);
    isRunning = true;
    startBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  }
}
let counter = 1;
resetBtn.addEventListener("click", () => {
  if (isRunning) {
    startBtn.style.backgroundColor="greenyellow";
    isRunning = false;
    startBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    clearInterval(intervalID);
  }
  lapBtn.disabled = true;
  resetBtn.disabled = true;
  elapsedTime = 0;
  display.textContent = "00:00:00:00";
  list.innerHTML = "";
  counter = 1;
});

lapBtn.addEventListener("click", showList);
function showList() {
  const lapTime = display.textContent;
  const lapList = document.createElement("li");
  // lapList.textContent = "Lap" + counter + " : " + lapTime; Older Design
  lapList.innerHTML = `<span>Lap ${counter}</span>       <span>${lapTime}</span>`;//New
  list.prepend(lapList);
  counter++;
}
