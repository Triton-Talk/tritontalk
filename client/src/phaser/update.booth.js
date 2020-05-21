import Phaser from 'phaser';

const updateBooth = game => {

  //For each booth, check if player is within distance
  const threshold = 130
  var interacting = false
  for (let i = 0; i < 2 * game.boothCount; i++) {
    //If the player is within distance of booth, highlight the booth
    if(Phaser.Math.Distance.Between(game.container.x, game.container.y, game.booths[i].x, game.booths[i].y) <= threshold) {
      game.booths[i].list[0].setTint(0x7d95ff);
      if(game.keyE.isDown)
      {
        console.log("I want to join booth " + i);
        interacting = true
        game.menu.visible = true;
      }
    } 
    else {//No highlight outside range
      game.booths[i].list[0].clearTint();
      game.menu.visible = false;
    }
  }
  //Lock player interaction while interacting with booth
  //Have sidebar menu open when interacting with booth
  //Menu will contain link to group call and any external link to club page or a club description  
}
  
export default updateBooth 
