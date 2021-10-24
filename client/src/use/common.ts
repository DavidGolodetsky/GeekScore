import { Game, Player, Team } from "@/types"

export const vibrate = (time = 300) => {
  // checking if mobile screen
  if (window.innerWidth < 600) {
    window.navigator.vibrate(time)
  }
}

export const generateNumberOfPlayers = () => {
  return Array(8).join(',').split(',').map((v, i) => i + 1)
}

export const getNames = (list:[]) => {
  return list?.map((obj: Game|Team|Player) => {return obj.name})
}
