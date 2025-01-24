import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';
import iziToast from 'izitoast';
console.log('iziToast:', iziToast);
import 'izitoast/dist/css/iziToast.min.css';

const optionsFp = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  theme: 'dark',
  onClose,
};
flatpickr('#datetime-picker', optionsFp);

const startBtnEl = document.querySelector('[data-start]');
const dayEl = document.querySelector('[data-days]');
const hourEl = document.querySelector('[data-hours]');
const minuteEl = document.querySelector('[data-minutes]');
const secondEl = document.querySelector('[data-seconds]');
const datetimePickerEl = document.querySelector('#datetime-picker');

let userSelectedDate;

startBtnEl.addEventListener('click', onStartBtn);

function onClose([selectedDate]) {
  if (selectedDate > Date.now()) {
    userSelectedDate = selectedDate.getTime();
    startBtnEl.disabled = false;
  } else {
    userSelectedDate = 0;
    updateTimerEl(convertMs(0));

    iziToast.error({
      title: 'Invalid',
      message: 'Please choose a date in the future',
      position: 'topCenter',
      timeout: 3500,
      transitionIn: 'bounceInDown',
    });
    startBtnEl.disabled = true;
  }
}

function onStartBtn() {
  startBtnEl.disabled = true;
  datetimePickerEl.disabled = true;
  
  const id = setInterval(() => {
    const diffTime = userSelectedDate - Date.now();
    if (diffTime >= 0) {
      updateTimerEl(convertMs(diffTime));
    } else {
      clearInterval(id);
      datetimePickerEl.disabled = false;
    }
  }, 1000);
}

function updateTimerEl({ days, hours, minutes, seconds }) {
  dayEl.textContent = days.length > 1 ? days : addLeadingZero(days);
  hourEl.textContent = addLeadingZero(hours);
  minuteEl.textContent = addLeadingZero(minutes);
  secondEl.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
