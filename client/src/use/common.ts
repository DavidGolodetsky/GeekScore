export const vibrate = (time: number = 300) => {
  if (window.innerWidth < 600) {
    window.navigator.vibrate(time);
  }
};
