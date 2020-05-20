import Phaser from 'phaser';


const createWalk = game => {
  //TODO: Fix game object positionings. I'm using literal unflexible pixel values
  //When images are created, they stack over each other

  //Number of booths currently open in library walk determines length of generated path
  game.boothCount = 10
  game.boothWidth = 527

  //Set world boundaries to match background image size
  game.physics.world.setBounds(0, 0, game.boothWidth*game.boothCount, 400, true, true, true, true);


  //Set background image. If it doesn't move, it doesn't need to be a sprite anymore
  //game.background = game.physics.add.sprite(0, 0, 'background');
  game.geisel = game.physics.add.sprite(game.boothWidth*game.boothCount, -50, 'geisel');

  //Generate the library walk path
  for (let i = 0; i < game.boothCount; i++) {
    var tempWalk = game.physics.add.sprite(game.boothWidth*i, -45, 'walk');
    var landingtop = game.physics.add.sprite(game.boothWidth*i, -100, 'table');
    var landingBot = game.physics.add.sprite(game.boothWidth*i, 400, 'table');
    tempWalk.setOrigin(0, 0);
    landingtop.setOrigin(0, 0);
    landingBot.setOrigin(0, 0);
  }

  game.geisel.setOrigin(0, 0);

}

export default createWalk
