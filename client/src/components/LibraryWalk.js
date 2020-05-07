import React, { Component } from 'react'
import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/react'
import PhaserScene from './PhaserScene.js'

class LibraryWalk extends Component {

  state = {
    initialize: true,
    game: {
      width: "90%",
      height: "90%",
      type: Phaser.AUTO,
	 physics: {
            default: 'arcade',
            arcade: {
            }
        },
      scene: PhaserScene
    }
  }

  render() {
    const { initialize, game } = this.state
    return (
      <IonPhaser game={game} initialize={initialize} />
    )
  }
}

export default LibraryWalk;
