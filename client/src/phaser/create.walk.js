const createWalk = game => {
  //TODO: Fix game object positionings. I'm using literal unflexible pixel values
  //When images are created, they stack over each other

  //Number of booths currently open in library walk determines length of generated path
  game.boothCount = 10;
  game.boothWidth = 527;

  //Set world boundaries to match background image size
  game.physics.world.setBounds(0, 0, game.boothWidth*game.boothCount, 400, true, true, true, true);


  //Set background image. If it doesn't move, it doesn't need to be a sprite anymore
  //game.background = game.physics.add.sprite(0, 0, 'background');
  game.geisel = game.physics.add.sprite(game.boothWidth*game.boothCount, -70, 'geisel');

  //Generate the library walk path
  game.booths = [];

  for (let i = 0; i < game.boothCount; i++) {
    var tempWalk = game.physics.add.sprite(game.boothWidth*i, -45, 'walk');
    tempWalk.setOrigin(0, 0);

    const textStyle = { 
      font: '20px Arial',
      fontWeight: 'bold',
      fill: 'WHItE',
      wordWrap: true,
      wordWrapWidth: 150,
      align: 'center'
    };
  
    var topText = game.add.text(0, -50, 'No Club yet', textStyle);
    topText.setOrigin(0.5, 0.5);
    var topTable = game.physics.add.sprite(0, 0, 'table');
    var topImage = game.physics.add.sprite(0, -150, 'transparent');
    

    game.booths[2 * i] = game.add.container(game.boothWidth*i + 75, -50, [topText, topTable, topImage]);
    var botText = game.add.text(0, 55, 'No Club yet', textStyle);
    botText.setOrigin(0.5, 0.5);
    var botTable = game.physics.add.sprite(0, 0, 'table');
    var botImage = game.physics.add.sprite(0, 150, 'transparent');
    game.booths[(2 * i) + 1] = game.add.container(game.boothWidth*i + 75, 450, [botTable, botText, botImage]);
  }

  game.geisel.setOrigin(0, 0);

}

export default createWalk
