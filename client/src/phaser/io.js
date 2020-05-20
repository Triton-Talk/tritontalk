import io from 'socket.io-client';
import {storage} from '../utils/firebase.js'

const URL = process.env.NODE_ENV === 'production' || process.env.REACT_APP_VARIABLE === 'docker' ? 
            '' : 'http://localhost:3001'

const createSocket = game => {

  game.socket = io(URL, {transport: ['websocket']})
  game.playerData = null
  game.player_updates = []
  game.players = {}

  //communicate our current state on instantiation
  game.socket.on('ready', () => {
    game.socket.emit('new-player', {
      x: game.container.x,
      y: game.container.y,
      vx: 0,
      vy: 0,
      playerId: game.socket.id,
      sprite: game.playerSprite, 
      name: game.name,
      college: game.college
    });
  });

  game.socket.on('update-player-location', data => {
    game.player_updates.push(data)
  })

  game.socket.on('new-player', data => {
    addPlayer(data, game)
  })

  game.socket.on('delete-player', data => {
    if(game.players[data])
      game.players[data].destroy()
  })

  game.socket.on('current-players', (data) => {
    for(let playerId in data){
      if(playerId === game.socket.id)
        continue

      addPlayer(data[playerId], game)
    }
  })

  game.socket.on('new-room', async data => {
    console.log('\n\n\nNEW ROOM', data)
    const url = await storage.ref('booth_' + data.name + '.jpg').getDownloadURL()
    console.log(url);

    game.load.image('booth_image', url);

    game.load.once('complete', () => {
      console.log("finished loading image")
      game.booths[19].list[2].setTexture('booth_image')
      game.booths[19].list[2].displayWidth = 150;
      game.booths[19].list[2].displayHeight = 150;
    }, this);

    game.load.start();
    
    // update client-side booth array once we have this stuff on backend
  })
}

const addPlayer = (player, game) => {

  const {x, y, playerId, name, college} = player

  //Set player position
  let newplayer = game.physics.add.sprite(0, 0, 'tritondude');

  //game.player.setCollideWorldBounds(true);
  newplayer.setOrigin(0.5, 0.5);
  newplayer.depth = 1000;

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
  container.setSize(64, 64);
  game.physics.world.enable(container);
  container.body.setCollideWorldBounds(true);

  game.players[playerId] = container
}


export default createSocket
