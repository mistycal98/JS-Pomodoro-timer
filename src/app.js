let countdown;
let countdownSeconds = 0;
let secondsLeft = 0;
let pause = false;

const audio = new Audio('./sounds/ding.mp3')

const timerDisplay = document.querySelector('.display-time-left');
const playBtn = document.querySelector('.fa-play');
const pauseBtn = document.querySelector('.fa-pause');

console.log(playBtn,pauseBtn);

const setTime = (seconds) => {
  pauseBtn.classList.add('disabled');
  playBtn.classList.remove('disabled');
  clearInterval(countdown);
  pause = false;
  countdownSeconds = seconds;
  secondsLeft = countdownSeconds;
  displayTimeLeft(countdownSeconds);
}

function pauseTimer() {

  pause = true;
  clearInterval(countdown);
  pauseBtn.classList.add('disabled');
  playBtn.classList.remove('disabled');
}

function timer() {
  let now = Date.now();
  let then;
  if (pause) {
    then = now + (secondsLeft) * 1000;
    console.log(now,then);
    playBtn.classList.remove('disabled');
    pauseBtn.classList.add('disabled');
  } else {
    then = now + countdownSeconds * 1000;
    pauseBtn.classList.remove('disabled');
    playBtn.classList.add('disabled');
  }
  pause = false;
  pauseBtn.classList.remove('disabled');
  playBtn.classList.add('disabled');
  countdown = setInterval(
    () => {
      if (secondsLeft <= 0) {
        clearInterval(countdown);
        audio.play();
        return;
      }
      secondsLeft = Math.round((then - Date.now()) / 1000);
      console.log(secondsLeft);
      displayTimeLeft(secondsLeft);
    }, 1000);

}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;

  // console.log(minutes, remainderSeconds);
}

window.onload = function () {
  pauseBtn.classList.add('disabled');
  setTime(1500);
  document.title = 'Pomodoro Timer';
}
