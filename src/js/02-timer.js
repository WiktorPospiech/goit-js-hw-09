import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datetimeIn = document.querySelector('input#datetime-picker');
const datetimeBtn = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

let datepickerFerst = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] >= new Date()) {
      datetimeBtn.removeAttribute('disabled');
    } else {
      Notiflix.Notify.warning('Please choose a date in the future', {
        position: 'center-top',
      });
      datetimeBtn.setAttribute('disabled', 'Some button');
    }
    console.log(selectedDates[0]);
    return (datepickerFerst = selectedDates[0]);
  },
};

flatpickr(datetimeIn, options);

let timePicker = 0;
let datePicker = 0;
let timerId = null;
const dateArr = [0, 0, 0, 0];

datetimeBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    datePicker = new Date();
    timePicker = datepickerFerst.getTime() - datePicker.getTime();
    convertMs(timePicker);
    addLeadingZero();
    days.textContent = dateArr[0];
    hours.textContent = dateArr[1];
    minutes.textContent = dateArr[2];
    seconds.textContent = dateArr[3];
    if (
      days.textContent === '00' &&
      hours.textContent === '00' &&
      minutes.textContent === '00' &&
      seconds.textContent === '00'
    ) {
      clearInterval(timerId);
    }
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  dateArr[0] = Math.floor(ms / day);
  dateArr[1] = Math.floor((ms % day) / hour);
  dateArr[2] = Math.floor(((ms % day) % hour) / minute);
  dateArr[3] = Math.floor((((ms % day) % hour) % minute) / second);
}

function addLeadingZero() {
  for (let i = 0; i < dateArr.length; i++) {
    let numb = dateArr[i];
    let text = numb.toString();
    dateArr[i] = text.padStart(2, '0');
  }
  return dateArr;
}
