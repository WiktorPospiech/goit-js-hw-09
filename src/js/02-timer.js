import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const input = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    datetimePicker(selectedDates);
  },
};

let intervalId = 0;

startButton.disabled = true;

flatpickr('#datetime-picker', { ...options });

function datetimePicker(selectedDates) {
  if (selectedDates[0].getTime() <= new Date()) {
    Notify.failure('Please choose a date in the future', {
      clickToClose: true,
    });
    startButton.disabled = true;
    return;
  } else {
    startButton.disabled = false;
  }
}

startButton.addEventListener('click', handleclick);

function handleclick() {
  startButton.disabled = true;
  input.disabled = true;

  intervalId = setInterval(updateCountdown, 1000);

  function updateCountdown() {
    const targetDate = new Date(input.value);
    const currentDate = new Date();
    const timeDifference = targetDate - currentDate;

    if (timeDifference < 0) {
      clearInterval(intervalId);
      startButton.disabled = true;

      daysElement.textContent = '00';
      hoursElement.textContent = '00';
      minutesElement.textContent = '00';
      secondsElement.textContent = '00';
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);

    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);

    startButton.disabled = false;
  }
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
