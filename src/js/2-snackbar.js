import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');
const { delay: userDelay, state: userState } = formEl.elements;

formEl.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();

  createPromise(userDelay.value, userState.value)
    .then(onFulfilled)
    .catch(onRejected);
}

function createPromise(delay, status) {
  const promise = new Promise((res, rej) => {
    if (status === 'fulfilled') setTimeout(() => res(delay), delay);
    if (status === 'rejected') setTimeout(() => rej(delay), delay);
  });
  return promise;
}
function onFulfilled(delay) {
  iziToast.success({
    title: 'Success',
    message: `Fulfilled promise in ${delay}ms`,
    position: 'topCenter',
    timeout: 3500,
    transitionIn: 'bounceInDown',
  });
}
function onRejected(delay) {
  iziToast.error({
    title: 'Error',
    message: `Rejected promise in ${delay}ms`,
    position: 'topCenter',
    timeout: 3500,
    transitionIn: 'bounceInDown',
  });
}