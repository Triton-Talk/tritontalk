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
    cookies.set('killTutorial', true)
  }

  const joinRoom = (name, host) => {
    console.log(host)
    history.push({pathname: "/lobby", state: {name: name, host}})
  }

  React.useEffect(() => {
    document.getElementById("root").style.backgroundColor = 'black'

    if(!user)
      return undefined

    if(!game){
      game = new PhaserScene(user, joinRoom, killTutorial, shouldKillAlert)
      config.scene = game
      new Phaser.Game(config)
    }
    else{
      document.getElementsByTagName('canvas')[0].style.display='block'

      game.input.keyboard.manager.preventDefault = true
      game.input.keyboard.enabled = true
      game.scale.resize(window.innerWidth, 0.92 * window.innerHeight)

      game.user = user
      game.player.setTexture(game.user.sprite)
      game.playerText.setText(game.user.name + '\n' + game.user.college)
      game.socket.emit('update-sprite', {sprite: user.sprite, playerId: game.socket.id})
      game.socket.emit('update-college', {college: user.college, playerId: game.socket.id})

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
