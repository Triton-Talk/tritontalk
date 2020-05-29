import Phaser from 'phaser'

const createPlayer = game => {

  //Set player position
  game.player = game.physics.add.sprite(0, -5, game.user.sprite);
  game.player.setOrigin(0.5, 0.5);

  //Player sprite's animated walk cycles for each direction
  var sprites = ["tritondude", "sungod", "queen", "neptune", "anuket", "chalchiuhtlicue", "dakuwaqa", "olokun"];

  //Tritondude animations
  for (const animSprite of sprites) {
    game.anims.create({
        key: 'walkDown-' + animSprite,
        frames: game.anims.generateFrameNumbers(animSprite, { start: 0, end: 2, first: 3 }),
        frameRate: 8,
        repeat: 0
    });

    game.anims.create({
        key: 'walkLeft-' + animSprite,
        frames: game.anims.generateFrameNumbers(animSprite, { start: 4, end: 6, first: 7 }),
        frameRate: 8,
        repeat: 0
    });

    game.anims.create({
        key: 'walkRight-' + animSprite,
        frames: game.anims.generateFrameNumbers(animSprite, { start: 8, end: 10, first: 11 }),
        frameRate: 8,
        repeat: 0
    });

    game.anims.create({
        key: 'walkUp-' + animSprite,
        frames: game.anims.generateFrameNumbers(animSprite, { start: 12, end: 14, first: 15 }),
        frameRate: 8,
        repeat: 0
    });
  }
  
  //Player text shows name and college, follows player
  const playerStyle = { 
    font: '12px Arial',
    fill: 'BLUE',
    wordWrap: true,
    wordWrapWidth: game.player.width,
    align: 'center'
  };

  game.playerText = game.add.text(0, -50, game.user.name + '\n' + game.user.college, playerStyle);
  game.playerText.setOrigin(0.5, 0.5);

  //User controls a container which contains the player sprite and player text
  game.container = game.add.container((1000*game.boothCount) - 128, 200, [game.player, game.playerText]);
  game.container.setSize(30, 30);
  game.physics.world.enable(game.container);
  game.container.body.setCollideWorldBounds(true);
  game.container.bringToTop(game.playerText);
  game.container.depth = 200

  game.clickCount = 0
  game.input.on('gameobjectdown', console.log)

  game.keyW = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  game.keyA = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  game.keyS = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  game.keyD = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
 

  game.keyShift = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
  game.keyEnter = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);




  //Camera follows the container as it moves until the map's edge
  var camera = game.cameras.main;
  camera.startFollow(game.container);

  //Camera just goes black when I try to apply physics to have it collide with bounds
  //camera.setPosition(500, 500);
  //game.physics.world.enable(camera);
  //camera.body.setCollideWorldBounds(true);

}

export default createPlayer
