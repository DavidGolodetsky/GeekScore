export const vibrate = (time = 300) => {
  if (window.innerWidth < 600) {
    window.navigator.vibrate(time);
  }
};
