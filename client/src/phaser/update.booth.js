import Phaser from 'phaser';

const updateBooth = game => {
  const threshold = 130
  //console.log(game.menu.savisible);
  let nearBooth = false;
  //For each booth, check if player is within distance
  for (let i = 0; i < 2 * game.boothCount; i++) {
    //If the player is within distance of booth, highlight the booth
    if(Phaser.Math.Distance.Between(game.container.x, game.container.y, game.booths[i].x, game.booths[i].y) <= threshold) {
      if(game.booth_list[i]){
        game.booths[i].list[0].setTint(0x7d95ff);
        game.booths[i].list[1].setTint(0x7d95ff);
        //console.log("I want to join booth " + i);
        //console.log(game.booth_list)
        if (!game.pmenu.visible) game.menu.visible = true;
        //set the X of the menu dynamically, so it moves on resize
        game.menu.setX(game.cameras.main.centerX)

        game.menu.list[4].text = game.booth_list[i].club.name
        game.menu.list[3].text = game.booth_list[i].club.description

        game.menu.list[5].setTexture('booth_image' + game.booth_list[i].club.name)
        game.menu.list[5].displayWidth = 150;
        game.menu.list[5].displayHeight = 150;
        game.selectedBooth = i;
        nearBooth = true;
      }
 
      //quit after first booth that's true, otherwise game.menu.visible will be overwritten
      break
    } else {//No highlight outside range
      game.booths[i].list[0].clearTint();
      game.booths[i].list[1].clearTint();
    }
  }
  if (!nearBooth) {
    game.menu.visible = false;
  }
  //Lock player interaction while interacting with booth
  //Have sidebar menu open when interacting with booth
  //Menu will contain link to group call and any external link to club page or a club description  
}
  
export default updateBooth 
