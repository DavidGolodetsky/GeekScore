export const vibrate = (time: number = 300) => {
  // checking if mobile screen
  if (window.innerWidth < 600) {
    window.navigator.vibrate(time);
  }
};
