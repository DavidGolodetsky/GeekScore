export const vibrate = (time = 300) => {
  // checking if mobile screen
  if (window.innerWidth < 600) {
    window.navigator.vibrate(time)
  }
}
