const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyBackgund = document.querySelector('body');

let timerId = null;

startBtn.addEventListener('click', () => {
  startBtn.toggleAttribute('disabled');
  timerId = setInterval(() => {
    bodyBackgund.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.removeAttribute('disabled');
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
