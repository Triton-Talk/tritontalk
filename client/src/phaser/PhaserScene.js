// import phaser module
import Phaser from 'phaser';

import createMethod from './create.js';
import preloadMethod from './preload.js';
import updateMethod from './update.js';

// create class for scene 1
class PhaserScene extends Phaser.Scene {

  constructor(user) {
    // create identifier for class scene
    super({ key: 'phaserScene' });

    this.name = user.name
    this.college = user.college
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
