import React, { Component } from 'react'
import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/react'
import PhaserScene from './PhaserScene.js'


export default class LibraryWalk extends Component {

  constructor(props) {
    super(props);
    this.state = {
      initialize: true,
      game: {
        scale: {
    parent: 'hi',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    marginTop:200,
    width: 800,
    height: 600
},
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
      <div style={{width:"100%",height:"100%",backgroundColor:"black",position:"relative", flexGrow: "1"}}>
        <div id="hi" style={{top:"250px",paddingTop:"40px",backgroundColor:"black"}} >
        <IonPhaser  game={game} initialize={initialize} />
      </div>
      </div>
    )
  }
}

