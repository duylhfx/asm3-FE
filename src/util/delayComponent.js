// delay component render
function delayComponent(promise, time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  }).then(() => promise);
}

export { delayComponent };
