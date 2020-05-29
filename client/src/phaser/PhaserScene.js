// import phaser module
import Phaser from 'phaser';

import createMethod from './create.js';
import preloadMethod from './preload.js';
import updateMethod from './update.js';

// create class for scene 1
class PhaserScene extends Phaser.Scene {

  constructor(user, joinRoom, killTutorial, shouldKillAlert) {
    // create identifier for class scene
    super({ key: 'phaserScene' });

    this.user = user;

    this.joinRoom = joinRoom
    this.killTutorial = killTutorial
    this.shouldKillAlert = shouldKillAlert
  }

  preload() {
    preloadMethod(this)
  }

  create() {
    createMethod(this)
  }

  update () {
    updateMethod(this)
  }
}

export default PhaserScene;
