import React from 'react'
import Phaser from 'phaser'
import PhaserScene from '../phaser/PhaserScene.js'
import { Modal} from 'react-bootstrap'

import Auth from '../utils/auth'

let game = undefined

const LibraryWalk  = (props) => {
  const { user } = React.useContext(Auth)
  console.log(user)

  React.useEffect(() => {

    if(!user)
      return undefined

    game = new PhaserScene(user)
    config.scene = game
    const PhaserGame = new Phaser.Game(config)

    function handleResize() {
      game.scale.resize(window.innerWidth, 0.92 * window.innerHeight)
    }

    window.addEventListener('resize', handleResize)
    
    return () => {
      console.log(game); 
      game.socket.disconnect(); 
      PhaserGame.destroy(true); 
      console.log('destroyed')
      window.removeEventListener('resize', handleResize)
    }
  })

  if(!user)
    return (
      <Modal show={true} centered> 
	<Modal.Header closeButton>
            <Modal.Title>Loading the app....</Modal.Title>
	</Modal.Header>
      </Modal>
      )

  const config = {
    scale: {
      parent: 'main-component',
      //autoCenter: Phaser.Scale.CENTER_WIDTH,
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

  /*
  return (
    <div style={{width:"100%",height:"100%",backgroundColor:"black",position:"relative", flexGrow: "1",overflow:"hidden"}}>
      <div id="hi" style={{top:"250px",paddingTop:"40px"}} >
      </div>
    </div>
  )*/
}

export default LibraryWalk

export {game}
