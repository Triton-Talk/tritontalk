const preload = game => {
  var progressBar = game.add.graphics();
  var progressBox = game.add.graphics();
  progressBox.fillStyle(0x222222, 0.8);
  progressBox.fillRect(game.cameras.main.centerX-160, game.cameras.main.centerY-25, 320, 50);

  game.load.on('progress', function (value) {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(game.cameras.main.centerX-150, game.cameras.main.centerY-15, 300 * value, 30);
  });

  game.load.on('complete', function () {
        progressBar.destroy();
        progressBox.destroy();
  });

  //This is the background image used for the map/environment
  game.load.image('background', 'assets/Starfall-Town.png');
  game.load.image('geisel', 'assets/geisel.png');
  game.load.image('walk', 'assets/walk.png');
  game.load.image('table', 'assets/table.png');
  game.load.image('transparent', 'assets/transparent.png');
  game.load.image('profilePicture', 'assets/borger.jpg');

  //This is the player sprite with animation frames

  var sprites = ["tritondude", "sungod", "queen", "neptune", "anuket", "chalchiuhtlicue", "dakuwaqa", "olokun", "gary"];
  for (const animSprite of sprites) {
    game.load.spritesheet(animSprite, 'assets/spritesheets/' + animSprite + '.png',{
      frameWidth: 64,
      frameHeight: 64,
      endFrame: 15
    });
  }

  /*

  TODO: Add more images for buildings, trees, etc for interaction
  game.load.image('building', 'building.png');

  TODO: Add other "players" to interact with
  game.load.spritesheet('npc', 'assets/NPC_Sprite_Sheet.png',{
    frameWidth: 64,
    frameHeight: 64,
    endFrame: 15
  });

  TODO: Add a menu that pops up when interacting with another player
  Display a "request call" button, profile picture, and basic user info?
  game.load.image('building', 'building.png');

  */
}

export default preload
