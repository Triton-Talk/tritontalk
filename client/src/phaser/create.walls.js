import Phaser from 'phaser';


const createWalls = game => {
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

}

export default createWalls
