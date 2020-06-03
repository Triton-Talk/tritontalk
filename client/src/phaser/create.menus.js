import Phaser from 'phaser';

const createMenus = game => {

 const tutorialStyle = { 
    font: '14px Arial',
    fill: 'WHITE'
  };
  game.tooltipsText = game.add.text(0, 0, 
                                    "Welcome to Triton Talk!\n" +
                                    "WASD to move your character\n" +
                                    "Hold shift while moving to sprint\n" +
                                    "Enter to teleport back to Geisel\n" +
                                    "Click on a player to interact\n" +
                                    "Press E at a booth to check it out\n\n" +
                                    "Click here to hide this tutorial.",
                                    tutorialStyle);
  game.tooltipsText.setOrigin(0.5, 0.5);

  const questionStyle = { 
    font: '22px Arial',
    fill: 'WHITE',
    wordWrap: true,
    wordWrapWidth: game.player.width,
  };

  game.tooltipsBox = game.add.rectangle(0, 0, 300, 160, 0x192847, 70);

  game.tooltips = game.add.container(0, 0, [game.tooltipsBox, game.tooltipsText]);
  game.tooltips.setScrollFactor(0); //Follows camera
  game.tooltips.setInteractive(new Phaser.Geom.Rectangle(-150, -155, 300, 310), Phaser.Geom.Rectangle.Contains);

  game.questionBtn = game.add.text(10, 10, "?", questionStyle)
                          .setInteractive(new Phaser.Geom.Circle(0, 0, 25), Phaser.Geom.Circle.Contains)
                          .on('pointerup', function (pointer) {
    game.tooltips.visible = true;
    game.questionBtn.visible = false;
  });


  if (game.shouldKillAlert) {
    game.questionBtn.visible = true;
    game.tooltips.visible = false;
  } else {
    game.questionBtn.visible = false;
    game.tooltips.visible = true;
  }
  game.questionBtn.setScrollFactor(0); //Follows camera

  
  game.tooltips.on('pointerup',  function (pointer) {
    game.tooltips.visible = false;
    game.questionBtn.visible = true;
    game.killTutorial();
  });

  //Menu that appears when player interacts with a number of components
  const menuBox = game.add.rectangle(0, 175, 500, 350, 0x192847, 70);
  const menuPortrait = game.add.rectangle(-125, 150, 174, 174, 0xebb734);
  const menuPic = game.add.image(-125, 150, "profilePicture").setScale(0.25);

  //game.menuClose = game.add.text(175, 40, "CLOSE", tooltipsStyle).setInteractive();

  const titleStyle = { 
    font: '20px Arial',
    fill: 'WHITE',
    wordWrap: { width: 300, useAdvancedWrap: true }
  };
  const menuTitle = game.add.text(-212, 30, "Club Name", titleStyle);

  const menuDescriptionStyle = { 
    font: '14px Arial',
    fill: 'WHITE',
    wordWrap: { width: 424, useAdvancedWrap: true }
  };
  const menuText = game.add.text(-212, 250, "Description:\nPull from user profile or club info", menuDescriptionStyle);

  const joinStyle = { 
    font: '14px Arial',
    fill: 'BLACK',
    wordWrap: true,
    wordWrapWidth: game.player.width,
  };

  const menuCallButton = game.add.rectangle(100, 150, 150, 50, 0xebb734);
  const menuCallText = game.add.text(38, 142, "Press E to Join Call", joinStyle);
  
  //Container holds all menu components
  game.menu = game.add.container(1300, 0, [menuBox, menuPortrait, menuCallButton, 
                                           menuText, menuTitle, menuPic, menuCallText]);
  game.menu.visible = false; //Appears when prompted
  game.menu.setScrollFactor(0); //Follows camera

  //Personal Menu

  const pmenuBox = game.add.rectangle(0, 175, 500, 350, 0x192847, 70);
  const pmenuPic = game.add.image(-125, 150, "profilePicture").setScale(0.25);

  const pmenuTitle = game.add.text(-212, 30, "Student Name", titleStyle);

  const pmenuText = game.add.text(-212, 250, "Description:\nPull from user profile or club info", menuDescriptionStyle);

  const pmenuCallButton = game.add.rectangle(100, 150, 150, 50, 0xebb734);
  const pmenuCallText = game.add.text(38, 142, "Press E to Join Call", joinStyle);

  const pmenuExitButton = game.add.rectangle(100, 210, 150, 50, 0xebb734);
  const pmenuExitText = game.add.text(48, 202, "Press Q to Close", joinStyle);
    
  //Container holds all menu components
  game.pmenu = game.add.container(1300, 0, [pmenuBox, pmenuCallButton, 
                                            pmenuText, pmenuTitle, pmenuPic, pmenuCallText, 
                                            pmenuExitButton, pmenuExitText]);
  game.pmenu.visible = false; //Appears when prompted
  game.pmenu.setScrollFactor(0); //Follows camera
  game.keyE = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
  game.keyQ = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

  game.keyE.on('down', function(event) { 
    if (game.menu.visible) {
      game.joinRoom(game.booth_list[game.selectedBooth].name, game.booth_list[game.selectedBooth].club.creator === game.user._id);
    }  else if (game.pmenu.visible) {
      var name1, name2
      if (game.user.name < game.selectedPlayer) {
        name1 = game.user.name
        name2 = game.selectedPlayer
      } else {
        name1 = game.selectedPlayer
        name2 = game.user.name
      }
      const roomName = name1 + " & " + name2
      console.log(roomName, game.user.sprite)
      const names = {
        sender: game.user.name,
        sprite: game.user.sprite,
        receiver: game.selectedPlayer
      }
      game.socket.emit('call-notif', names)
      game.pmenu.visible = false

      game.joinRoom(roomName)
    }
  })

  game.keyQ.on('down', function(event) {
    if (game.pmenu.visible) {
      game.pmenu.visible = false
    }
  })

  game.tooltips.depth = 2000
  game.menu.depth = 2000
  game.pmenu.depth = 2000

}

export default createMenus
