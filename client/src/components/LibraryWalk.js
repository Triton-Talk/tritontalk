import React, { Component } from 'react'
import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/react'

class LibraryWalk extends Component {

  state = {
    initialize: true,
    game: {
      width: "100%",
      height: "100%",
      type: Phaser.AUTO,
	 physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 200 }
            }
        },
      scene: {
        preload: function() {
		this.load.setBaseURL('https://labs.phaser.io');
		this.load.image('logo', 'assets/sprites/phaser3-logo.png');
		this.load.image('red', 'assets/particles/red.png');
        },
        create: function() {

		var particles = this.add.particles('red');

		var emitter = particles.createEmitter({
		    speed: 100,
		    scale: { start: 1, end: 0 },
		    blendMode: 'ADD'
		});

		var logo = this.physics.add.image(400, 100, 'logo');

		logo.setVelocity(100, 200);
		logo.setBounce(1, 1);
		logo.setCollideWorldBounds(true);

		emitter.startFollow(logo);
        }
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
