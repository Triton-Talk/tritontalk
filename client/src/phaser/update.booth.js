import Phaser from 'phaser';

const updateBooth = game => {

  //For each booth, check if player is within distance
  const threshold = 130
  for (let i = 0; i < 2 * game.boothCount; i++) {
    //If the player is within distance of booth, highlight the booth
    if(Phaser.Math.Distance.Between(game.container.x, game.container.y, game.booths[i].x, game.booths[i].y) <= threshold) {
      game.booths[i].list[0].setTint(0x7d95ff);
      game.booths[i].list[1].setTint(0x7d95ff);
      if(game.keyE.isDown) {
        console.log("I want to join booth " + i);
        game.menu.visible = true;
        //set the X of the menu dynamically, so it moves on resize
        console.log(game.booth_list)
        game.menu.setX(game.cameras.main.centerX * 1.5)
        game.menu.list[5].text = game.booth_list[i].club.name

        game.menu.list[6].setTexture('booth_image' + game.booth_list[i].club.name)
        game.menu.list[6].displayWidth = 150;
        game.menu.list[6].displayHeight = 150;
      }
      //quit after first booth that's true, otherwise game.menu.visible will be overwritten
      break
    } 
    else {//No highlight outside range
      game.booths[i].list[0].clearTint();
      game.booths[i].list[1].clearTint();
      game.menu.visible = false;
    }
  }
  //Lock player interaction while interacting with booth
  //Have sidebar menu open when interacting with booth
  //Menu will contain link to group call and any external link to club page or a club description  
}
  
export default updateBooth 
