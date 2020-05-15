import React, { Component } from 'react'
import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/react'
import PhaserScene from './PhaserScene.js'


class LibraryWalk extends Component {

  constructor(props) {
    super(props);
    this.state = {
      initialize: true,
      game: {
        width: "100%",
        height: "100%",
        type: Phaser.AUTO,
        physics: {
          default: 'arcade',
          arcade: {}
        },
        scene: PhaserScene
      }
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
