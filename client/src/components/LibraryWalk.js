import React from 'react'
import Phaser from 'phaser'
import PhaserScene from '../phaser/PhaserScene.js'
import Cookies from 'universal-cookie'
import { useHistory } from 'react-router-dom'

import Auth from '../utils/auth'

let game = undefined

const cookies = new Cookies()
let shouldKillAlert = cookies.get('killTutorial')
const LibraryWalk  = (props) => {

  const history = useHistory()

  const { user } = React.useContext(Auth)

  const killTutorial = () => {
    console.log("THIS WILL KILL THE TUTORIAL")
    cookies.set('killTutorial', true)
  }

  const joinRoom = (name) => {
    console.log("I SHOULD JOIN A CALL FOR " + name)
    history.push({pathname: "/lobby", state: {name: name}})
  }

  React.useEffect(() => {
    document.getElementById("root").style.backgroundColor = 'black'

    if(!user)
      return undefined

    if(!game){
      game = new PhaserScene(user, joinRoom, killTutorial, shouldKillAlert)
      config.scene = game
      const PhaserGame = new Phaser.Game(config)
    }
    else{
      document.getElementsByTagName('canvas')[0].style.display='block'
      game.input.keyboard.manager.preventDefault = true
      game.input.keyboard.enabled = true
    }

    function handleResize() {
      game.scale.resize(window.innerWidth, 0.92 * window.innerHeight)
    }

    window.addEventListener('resize', handleResize)
    
    return () => {
      document.getElementsByTagName('canvas')[0].style.display='none'
      window.removeEventListener('resize', handleResize)
      document.getElementById("root").style.backgroundColor = 'white'
      game.input.keyboard.manager.preventDefault = false
      game.input.keyboard.enabled = false
    }
  })


  const config = {
    scale: {
      parent: 'main-component',
      width: "100%",
      height: '92vh'
    },
    type: Phaser.AUTO,
    physics: {
      default: 'arcade',
      arcade: {}
    },
  }

  return null
}

export default LibraryWalk

export {game}
