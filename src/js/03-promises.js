import Notiflix from 'notiflix';
import '../../node_modules/notiflix/dist/notiflix-3.2.5.min.css';

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });
}

const inputDelayEl = document.querySelector('input[name = "delay"]');
const inputStepEl = document.querySelector('input[name = "step"]');
const inputAmountEl = document.querySelector('input[name = "amount"]');

const form = document.querySelector('form');
form.addEventListener('submit', e => {
  e.preventDefault();
  let delay = Number(inputDelayEl.value);
  let promisePosition = 1;
  for (let i = 1; i <= Number(inputAmountEl.value); i += 1) {
    createPromise(promisePosition, delay)
      .then(({ promisePosition, delay }) => {
        Notiflix.Notify.success(
          `Fulfilled promise ${promisePosition} in ${delay}ms`
        );
      })
      .catch(({ promisePosition, delay }) => {
        Notiflix.Notify.failure(
          `Rejected promise ${promisePosition} in ${delay}ms`
        );
      });
    delay += Number(inputStepEl.value);
    promisePosition = i + 1;
  }
});
