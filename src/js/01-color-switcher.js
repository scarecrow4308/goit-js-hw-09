function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startBtnEl = document.querySelector('button');
const stopBtnEl = startBtnEl.nextElementSibling;

const bodyChangeColor = function () {
  document.querySelector(
    'body'
  ).style = `background-color: ${getRandomHexColor()}`;
};

stopBtnEl.setAttribute('disabled', '');

startBtnEl.addEventListener('click', e => {
  bodyChangeColor();
  const loopColorChange = setInterval(bodyChangeColor, 1000);
  startBtnEl.setAttribute('disabled', '');
  stopBtnEl.removeAttribute('disabled');

  stopBtnEl.addEventListener('click', event => {
    clearInterval(loopColorChange);
    startBtnEl.removeAttribute('disabled');
    stopBtnEl.setAttribute('disabled', '');
  });
});
