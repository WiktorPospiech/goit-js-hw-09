const firstDelay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
const btn = document.querySelector('button[type="submit');

function createPromise(position, delay) {
  const promisObj = {
    position: position,
    delay: delay,
  };
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(() => {
          return promisObj;
        });
      } else {
        reject(() => {
          return promisObj;
        });
      }
    }, delay);
  });

  promise
    .then(promisObj => {
      console.log(`Fulfilled promise ${position} in ${delay}ms`);
      return;
    })
    .catch(promisObj => {
      console.log(`Rejected promise ${position} in ${delay}ms`);
      return;
    });
}
let delayCounter = 0;
let positionCounter = 0;

function massPromiseCreator(e) {
  e.preventDefault();
  delayCounter = Number(firstDelay.value);
  positionCounter = 1;
  for (let i = 0; i < Number(amount.value); i++) {
    createPromise(positionCounter, delayCounter);
    positionCounter++;
    delayCounter += Number(step.value);
  }
}

btn.addEventListener('click', massPromiseCreator);
