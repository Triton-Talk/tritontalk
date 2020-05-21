import Phaser from 'phaser'

const createPlayer = game => {
  //Set player position
  game.player = game.physics.add.sprite(0, -5, 'tritondude');
  game.playerSprite = 'tritondude';
  game.player.setOrigin(0.5, 0.5);

  //Player sprite's animated walk cycles for each direction

  //Tritondude animations
  game.anims.create({
      key: 'walkDown-tritondude',
      frames: game.anims.generateFrameNumbers('tritondude', { start: 0, end: 2, first: 3 }),
      frameRate: 8,
      repeat: 0
  });

  game.anims.create({
      key: 'walkLeft-tritondude',
      frames: game.anims.generateFrameNumbers('tritondude', { start: 4, end: 6, first: 7 }),
      frameRate: 8,
      repeat: 0
  });

  game.anims.create({
      key: 'walkRight-tritondude',
      frames: game.anims.generateFrameNumbers('tritondude', { start: 8, end: 10, first: 11 }),
      frameRate: 8,
      repeat: 0
  });

  game.anims.create({
      key: 'walkUp-tritondude',
      frames: game.anims.generateFrameNumbers('tritondude', { start: 12, end: 14, first: 15 }),
      frameRate: 8,
      repeat: 0
  });

  //Sungod animations
  game.anims.create({
    key: 'walkDown-sungod',
    frames: game.anims.generateFrameNumbers('sungod', { start: 0, end: 2, first: 3 }),
    frameRate: 8,
    repeat: 0
  });

  game.anims.create({
      key: 'walkLeft-sungod',
      frames: game.anims.generateFrameNumbers('sungod', { start: 4, end: 6, first: 7 }),
      frameRate: 8,
      repeat: 0
  });

  game.anims.create({
      key: 'walkRight-sungod',
      frames: game.anims.generateFrameNumbers('sungod', { start: 8, end: 10, first: 11 }),
      frameRate: 8,
      repeat: 0
  });

  game.anims.create({
      key: 'walkUp-sungod',
      frames: game.anims.generateFrameNumbers('sungod', { start: 12, end: 14, first: 15 }),
      frameRate: 8,
      repeat: 0
  });

  //Queen Triton animations
  game.anims.create({
    key: 'walkDown-queen',
    frames: game.anims.generateFrameNumbers('queen', { start: 0, end: 2, first: 3 }),
    frameRate: 8,
    repeat: 0
  });

  game.anims.create({
      key: 'walkLeft-queen',
      frames: game.anims.generateFrameNumbers('queen', { start: 4, end: 6, first: 7 }),
      frameRate: 8,
      repeat: 0
  });

  game.anims.create({
      key: 'walkRight-queen',
      frames: game.anims.generateFrameNumbers('queen', { start: 8, end: 10, first: 11 }),
      frameRate: 8,
      repeat: 0
  });

  game.anims.create({
      key: 'walkUp-queen',
      frames: game.anims.generateFrameNumbers('queen', { start: 12, end: 14, first: 15 }),
      frameRate: 8,
      repeat: 0
  });

  //King Neptune animations
  game.anims.create({
    key: 'walkDown-neptune',
    frames: game.anims.generateFrameNumbers('neptune', { start: 0, end: 2, first: 3 }),
    frameRate: 8,
    repeat: 0
  });

  game.anims.create({
      key: 'walkLeft-neptune',
      frames: game.anims.generateFrameNumbers('neptune', { start: 4, end: 6, first: 7 }),
      frameRate: 8,
      repeat: 0
  });

  game.anims.create({
      key: 'walkRight-neptune',
      frames: game.anims.generateFrameNumbers('neptune', { start: 8, end: 10, first: 11 }),
      frameRate: 8,
      repeat: 0
  });

  game.anims.create({
      key: 'walkUp-neptune',
      frames: game.anims.generateFrameNumbers('neptune', { start: 12, end: 14, first: 15 }),
      frameRate: 8,
      repeat: 0
  });

  //Pokeman animations
  game.anims.create({
    key: 'walkDown-pokeman',
    frames: game.anims.generateFrameNumbers('pokeman', { start: 0, end: 2, first: 3 }),
    frameRate: 8,
    repeat: 0
  });

  game.anims.create({
      key: 'walkLeft-pokeman',
      frames: game.anims.generateFrameNumbers('pokeman', { start: 4, end: 6, first: 7 }),
      frameRate: 8,
      repeat: 0
  });

  game.anims.create({
      key: 'walkRight-pokeman',
      frames: game.anims.generateFrameNumbers('pokeman', { start: 8, end: 10, first: 11 }),
      frameRate: 8,
      repeat: 0
  });

  game.anims.create({
      key: 'walkUp-pokeman',
      frames: game.anims.generateFrameNumbers('pokeman', { start: 12, end: 14, first: 15 }),
      frameRate: 8,
      repeat: 0
  });
  
  //Player text shows name and college, follows player
  const playerStyle = { 
    font: '12px Arial',
    fill: 'BLUE',
    wordWrap: true,
    wordWrapWidth: game.player.width,
    align: 'center'
  };

  game.playerText = game.add.text(0, -50, game.name + '\n' + game.college, playerStyle);
  game.playerText.setOrigin(0.5, 0.5);

  //User controls a container which contains the player sprite and player text
  game.container = game.add.container((1000*game.boothCount) - 128, 200, [game.player, game.playerText]);
  game.container.setSize(30, 30);
  game.physics.world.enable(game.container);
  game.container.body.setCollideWorldBounds(true);
  game.container.depth = 1000
  game.container.bringToTop(game.playerText);

  game.clickCount = 0
  game.input.on('gameobjectdown', console.log)

  game.keyW = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  game.keyA = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  game.keyS = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  game.keyD = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  game.keyE = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

  game.keyShift = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
  game.keyEnter = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

  game.key1 = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
  game.key2 = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
  game.key3 = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
  game.key4 = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
  game.key5 = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE);

  //Camera follows the container as it moves until the map's edge
  var camera = game.cameras.main;
  camera.startFollow(game.container);

  //Camera just goes black when I try to apply physics to have it collide with bounds
  //camera.setPosition(500, 500);
  //game.physics.world.enable(camera);
  //camera.body.setCollideWorldBounds(true);

}

export default createPlayer
