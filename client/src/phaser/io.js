import io from 'socket.io-client';
import {storage} from '../utils/firebase.js'

const URL = process.env.NODE_ENV === 'production' || process.env.REACT_APP_VARIABLE === 'docker' ? 
            '' : 'http://localhost:3001'

const createSocket = game => {

  game.socket = io(URL, {transport: ['websocket']})
  game.playerData = null
  game.player_updates = []
  game.players = {}
  game.sprites = {}
  game.colleges = {}
  game.names = {}
  game.bios = {}
  
  game.booth_list = {}

  //communicate our current state on instantiation
  game.socket.on('ready', () => {
    game.socket.emit('new-player', {
      x: game.container.x,
      y: game.container.y,
      vx: 0,
      vy: 0,
      playerId: game.socket.id,
      sprite: game.user.sprite, 
      name: game.user.name,
      college: game.user.college,
      bio: game.user.bio,
      mongoId: game.user._id
    });
  });

  game.socket.on('update-player-location', data => {
    game.player_updates.push(data)
  })

  game.socket.on('update-sprite', data => {
    game.players[data.playerId].list[0].setTexture(data.sprite)
    game.sprites[data.playerId] = data.sprite
  })

  game.socket.on('update-college', data => {
    game.players[data.playerId].list[1].setText(game.names[data.playerId] + '\n' + data.college)
    game.colleges[data.playerId] = data.college
  })

  game.socket.on('update-bio', data => {
    game.bios[data.playerId] = data.bio
  })

  game.socket.on('new-player', data => {
    addPlayer(data, game)
  })

  game.socket.on('delete-player', data => {
    if(game.players[data]) {
      game.player_updates = game.player_updates.filter(element =>element.playerId !== data)

      game.tweens.add({
        targets: game.players[data],
        scaleX: 0,
        scaleY: 0,
        duration: 200,
        ease: 'Linear',
        delay: 0,
        onComplete: function () { game.players[data].destroy(); delete game.players[data] }
      });

      /*
      game.players[data].destroy()
      delete game.players[data]
      */
    }
  })

  game.socket.on('current-players', (data) => {
    for(let playerId in data){
      if (game.user._id === data[playerId].mongoId) {
        if (playerId === game.socket.id) {
          continue
        } else {
          game.duplicatePlayer()
          break
        }
      }
      addPlayer(data[playerId], game)
    }
  })

  game.socket.on('current-rooms', (data) => {
    for(let boothId in data){
      addBooth(data[boothId], game)
      game.booth_list[data[boothId].index] = data[boothId]
    }
  })

  game.socket.on('new-room', data => {
    console.log(data)
    addBooth(data, game)
    game.booth_list[data.index] = data
  })

  game.socket.on('delete-room', index => {
    console.log(game.booths, index)
    if(!game.booths[index])
      return 

    game.tweens.add({
      targets: game.booths[index].list[2],
      alpha: 0,
      duration: 500,
      ease: 'Linear',
      delay: 0,
      onComplete: function(){
        game.booths[index].list[2].setTexture('transparent')
        game.booths[index].list[2].alpha = 1
        game.booths[index].list[2].displayWidth = 150;
        game.booths[index].list[2].displayHeight = 150;
    
        game.booths[index].list[1].text = '';
      }
    });

    delete game.booth_list[index]
  })

  game.socket.on('check-room', data => {
    for (let index in game.booth_list) {
      let booth = game.booth_list[index]
      console.log(booth, data)
      if (booth.club._id === data._id) {
        addBooth({...booth, club: data}, game)
      }
    }
  })

  game.socket.on('call-notif', names => {
    if (game.user.name === names.receiver) {
      //pmenu with names.sender name and sprite
      game.pmenu.visible = true;
      game.menu.visible = false;
      //set the X of the menu dynamically, so it moves on resize
      game.pmenu.setX(game.cameras.main.centerX)

      game.pmenu.list[3].text = names.sender
      game.pmenu.list[2].text = names.sender + " would like to call you."

      game.pmenu.list[4].setTexture(names.sprite)
      game.pmenu.list[4].displayWidth = 150;
      game.pmenu.list[4].displayHeight = 150;
      game.selectedPlayer = names.sender;
    }
  })

  game.socket.on('call-dismissed', data => {
    // console.log(data.name, game.selectedPlayer)
    if (game.selectedPlayer === data.name) {
      game.pmenu.visible = false
    }
  })
}

const addPlayer = (player, game) => {

  const {x, y, playerId, name, sprite, college, bio} = player

  //Set player position
  let newplayer = game.physics.add.sprite(0, -5, sprite);

  //Allow players to interact with each other via mouse hovers and clicks
  newplayer.setInteractive()
  newplayer.on('pointerover', function (pointer) {
    newplayer.setTint(0x7d95ff);
  });

  newplayer.on('pointerout', function (pointer) {
    newplayer.clearTint();
  });

  newplayer.on('pointerdown', function (pointer) {
      console.log("clicked on " + name)
      game.pmenu.visible = true;
      game.menu.visible = false;
      //set the X of the menu dynamically, so it moves on resize
      game.pmenu.setX(game.cameras.main.centerX)

      game.pmenu.list[3].text = name
      game.pmenu.list[2].text = game.bios[playerId]

      game.pmenu.list[4].setTexture(game.sprites[playerId])
      game.pmenu.list[4].displayWidth = 150;
      game.pmenu.list[4].displayHeight = 150;
      game.selectedPlayer = name;
    
  });

  //game.player.setCollideWorldBounds(true);
  newplayer.setOrigin(0.5, 0.5);

  //Player text shows name and college, follows player
  var playerStyle = {
    font: '12px Arial',
    fill: 'BLUE',
    wordWrap: true,
    wordWrapWidth: newplayer.width,
    align: 'center'
  };

  var newPlayerText = game.add.text(0, -50, name + '\n' + college, playerStyle)
  newPlayerText.setOrigin(0.5, 0.5);

  //User controls a container which contains the player sprite and player text
  const container = game.add.container(x, y, [newplayer, newPlayerText]);
  container.setSize(30, 30);
  game.physics.world.enable(container);
  container.body.setCollideWorldBounds(true);
  container.bringToTop(newPlayerText);
  game.players[playerId] = container
  game.sprites[playerId] = sprite
  game.colleges[playerId] = college
  game.bios[playerId] = bio
  game.names[playerId] = name
  game.players[playerId].depth = y

  container.alpha = 0.1
  newplayer.alpha = 0.1
  newPlayerText.alpha = 0.1

  game.tweens.add({
    targets: [container, newplayer, newPlayerText],
    alpha: 1,
    duration: 200,
    ease: 'Linear',
    delay: 0,
  });

}

const addBooth = async (data, game) => {
    const url = await storage.ref(data.club.booth).getDownloadURL()

    game.load.image('booth_image' + data.name, url);

    game.load.once('complete', () => {
      //console.log("finished loading image")
      game.booths[data.index].list[2].setTexture('booth_image' + data.name)
      game.booths[data.index].list[2].displayWidth = 150;
      game.booths[data.index].list[2].displayHeight = 150;

      game.booths[data.index].list[1].text = data.name
    }, this);

    game.load.start();
    
    // update client-side booth array once we have this stuff on backend
}


export default createSocket
