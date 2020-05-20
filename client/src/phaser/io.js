import Phaser from 'phaser';
import io from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' || process.env.REACT_APP_VARIABLE === 'docker' ? 
            '' : 'http://localhost:3001'

const createSocket = game => {

  game.socket = io(URL, {transport: ['websocket']})
  game.playerData = null
  game.player_updates = []
  game.players = {}

  game.socket.on('update-player-location', data => {
    game.player_updates.push(data)
  })

  game.socket.on('new-player', data => {
    console.log('new player' ,data)
    const {x, y, playerId, name, college} = data

    //Set player position
    const newplayer = game.physics.add.sprite(0, 0, 'tritondude');

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
  })

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

  game.socket.on('delete-player', data => {
    if(game.players[data])
      game.players[data].destroy()
  })

  game.socket.on('current-players', (data) => {
    for( let p in data ){
      if(p === game.socket.id)
        continue

      const {x, y, playerId, name, college} = data[p]

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

      //Container contains the player sprite and player text
      game.players[playerId] = game.add.container(x, y, [newplayer, newPlayerText]);
      game.players[playerId].setSize(64, 64);
      game.physics.world.enable(game.players[playerId]);
      game.players[playerId].body.setCollideWorldBounds(true);
    }
  })
}


export default createSocket
