import Phaser from 'phaser';

const update = game => {
  game.container.body.velocity.set(0, 0);
  game.isMoving = false;
  game.isMovingX = false;
  var velocity = 250;
  if(game.keyShift.isDown)
    velocity *= 2

  if(game.key1.isDown) {
    game.player.setTexture('tritondude');
    game.playerSprite = 'tritondude';
  }
  if(game.key2.isDown) {
    game.player.setTexture('sungod');
    game.playerSprite = 'sungod';
  }

  //TODO: Fix animations so that sprite always stops at standing frame

  if (game.keyA.isDown) {
    //game.menu.visible = true;
    game.container.body.setVelocityX(-velocity);
    game.isMoving = true;
    game.isMovingX = true;
    game.player.anims.play('walkLeft-' + game.playerSprite, true);

    game.doNotUpdate = false
    game.socket.emit('move-player', {
      x: game.container.x,
      y: game.container.y,
      vx: game.container.body.velocity.x,
      vy: game.container.body.velocity.y,
      sprite: game.playerSprite,
      playerId: game.socket.id
    });
  } else if (game.keyD.isDown) {
    game.container.body.setVelocityX(velocity);
    game.isMovingX = true;
    game.isMoving = true;
    game.player.anims.play('walkRight-' + game.playerSprite, true);

    game.doNotUpdate = false

    game.socket.emit('move-player', {
      x: game.container.x,
      y: game.container.y,
      vx: game.container.body.velocity.x,
      vy: game.container.body.velocity.y,
      sprite: game.playerSprite,
      playerId: game.socket.id
    });
  }

  if (game.keyW.isDown) {
    game.container.body.setVelocityY(-velocity);
    game.isMoving = true;
    if (!game.isMovingX) {
      game.player.anims.play('walkUp-' + game.playerSprite, true);
    }

    game.doNotUpdate = false
    game.socket.emit('move-player', {
      x: game.container.x,
      y: game.container.y,
      vx: game.container.body.velocity.x,
      vy: game.container.body.velocity.y,
      sprite: game.playerSprite,
      playerId: game.socket.id
    });
  } else if (game.keyS.isDown) {
    game.container.body.setVelocityY(velocity);
    game.isMoving = true;
    if (!game.isMovingX) {
      game.player.anims.play('walkDown-' + game.playerSprite, true);
    }

    game.doNotUpdate = false
    game.socket.emit('move-player', {
      x: game.container.x,
      y: game.container.y,
      vx: game.container.body.velocity.x,
      vy: game.container.body.velocity.y,
      sprite: game.playerSprite,
      playerId: game.socket.id
    });
  }
  if(!game.isMoving){
    game.player.anims.stop();
    if(!game.doNotUpdate)
      game.socket.emit('move-player', {
        x: game.container.x,
        y: game.container.y,
        vx: game.container.body.velocity.x,
        vy: game.container.body.velocity.y,
        sprite: game.playerSprite,
        playerId: game.socket.id
      });

  game.doNotUpdate = true
  }

  while(game.player_updates.length > 0){

    const {x, y, vx, vy, sprite, playerId} = game.player_updates.shift()

    console.log(x, y, playerId)

    if(game.players[playerId]){

      game.tweens.add({
        targets: game.players[playerId],
        x: x,
        y: y,
        duration: 50,
        ease: 'Linear',
        delay: 0
      });

      console.log(sprite);


      if (vx < 0) {
        game.players[playerId].first.anims.play('walkLeft-' + sprite, true);
      }
      else if (vx > 0) {
        game.players[playerId].first.anims.play('walkRight-' + sprite, true);
      }
      else if (vy < 0) {
        game.players[playerId].first.anims.play('walkUp-' + sprite, true);
      }
      else if (vy > 0) {
        game.players[playerId].first.anims.play('walkDown-' + sprite, true);
      }
      else {
        game.players[playerId].first.anims.stop();
      }
    }
  }
}

export default update
