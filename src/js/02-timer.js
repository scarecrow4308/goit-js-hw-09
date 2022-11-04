import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import '../../node_modules/notiflix/dist/notiflix-3.2.5.min.css';

const dataPickerEl = document.querySelector('#datetime-picker');
const btnEl = document.querySelector('button');

const gettingTime = function (diff) {
  return {
    days: Math.floor(diff / 1000 / 60 / 60 / 24),
    hours: Math.floor(diff / 1000 / 60 / 60) % 24,
    minutes: Math.floor(diff / 1000 / 60) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  };
};

const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

// btnEl.addEventListener('click', e => {
//   btnEl.setAttribute('disabled', '');
//   dataPickerEl.setAttribute('disabled', '');
//   console.dir(flatpickr.onBtnClick);
// });
let currentInterval = null;

flatpickr(dataPickerEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    btnEl.addEventListener('click', e => {
      btnEl.setAttribute('disabled', '');

      if (currentInterval !== null) {
        clearInterval(currentInterval);
      }

      currentInterval = setInterval(() => {
        const pickedDate = selectedDates[0].getTime();
        const diff = pickedDate - Date.now();

        if (diff <= 0) {
          btnEl.removeAttribute('disabled');
          return;
        }

        const diffDate = gettingTime(diff);

        days.textContent = `${new String(diffDate.days).padStart(2, '0')}`;
        hours.textContent = `${new String(diffDate.hours).padStart(2, '0')}`;
        minutes.textContent = `${new String(diffDate.minutes).padStart(
          2,
          '0'
        )}`;
        seconds.textContent = `${new String(diffDate.seconds).padStart(
          2,
          '0'
        )}`;
      }, 1000);
    });
  },

  onChange(selectedDates) {
    const pickedDate = selectedDates[0].getTime();
    const diff = pickedDate - Date.now();
    if (diff > 0) {
      btnEl.removeAttribute('disabled');
      return;
    }

    if (diff <= 0) {
      Notiflix.Report.failure(
        'Attention',
        'Please choose a date in the future',
        'Close'
      );
      btnEl.setAttribute('disabled', '');
      return;
    }
  },
});
