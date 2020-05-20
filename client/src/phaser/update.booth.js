import Phaser from 'phaser';

const updateBooth = game => {

    
    //For each booth, check if player is within distance
  
  var threshold = 130
  var interacting = false
  for (let i = 0; i < 2 * game.boothCount; i++) {

    //If the player is within distance, then show booth image and prompt interaction
    if(game.keyE.isDown && Phaser.Math.Distance.Between(game.container.x, game.container.y, game.booths[i].x, game.booths[i].y) <= threshold)
    {
        //game.menu.visible = true;
        console.log("I want to join booth " + i);
        interacting = true
    }


  }
  //Lock player interaction while interacting with booth
  //Have sidebar menu open when interacting with booth
  //Menu will contain link to group call and any external link to club page or a club description  
}
  
export default updateBooth 