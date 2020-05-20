import Phaser from 'phaser'

const createPlayer = game => {
  //Set player position
  game.player = game.physics.add.sprite(0, 0, 'tritondude');
  game.playerSprite = 'tritondude';
  game.player.setOrigin(0.5, 0.5);

  //Player sprite's animated walk cycles for each direction
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


  game.player.setInteractive()
  game.clickCount = 0
  game.input.on('gameobjectdown', console.log)

  game.keyW = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  game.keyA = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  game.keyS = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  game.keyD = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

  game.keyShift = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

  game.key1 = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
  game.key2 = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);

  //Camera follows the container as it moves until the map's edge
  var camera = game.cameras.main;
  camera.startFollow(game.container);

  //Camera just goes black when I try to apply physics to have it collide with bounds
  //camera.setPosition(500, 500);
  //game.physics.world.enable(camera);
  //camera.body.setCollideWorldBounds(true);

  /*
  //Generate walls around the library walk
  for (let i = 0; i < game.boothCount; i++) {
    const walls = game.physics.add.staticGroup();

    const wallTop = game.add.rectangle((game.boothWidth*i)+150, 0, 375, 100, 0x5e32a8, 0);
    const wallBottom = game.add.rectangle((game.boothWidth*i)+150, 300, 375, 100, 0x5e32a8, 0);
    wallTop.setOrigin(0,0);
    wallBottom.setOrigin(0,0);
    walls.add(wallTop);
    walls.add(wallBottom);
    game.physics.add.collider(game.container, wallTop);
    game.physics.add.collider(game.container, wallBottom);
  }


  //TODO: Make game a container?
  //Menu that appears when player interacts
  game.menu = game.add.rectangle(1200, 600, game.boothWidth, 1250, 0x5e32a8, 70);
  game.menu.visible = false; //Appears when prompted
  game.menu.setScrollFactor(0); //Follows camera

  //TODO: Make walls to block player movement
  //game.wall = game.physics.add.rectangle(1200, 600, 500, 1250, 0x5e32a8, 70);

  //Camera follows the container as it moves until the map's edge
  var camera = game.cameras.main;
  camera.startFollow(game.container);

  //Camera just goes black when I try to apply physics to have it collide with bounds
  //camera.setPosition(500, 500);
  //game.physics.world.enable(camera);
  //camera.body.setCollideWorldBounds(true);
  */

}

export default createPlayer
