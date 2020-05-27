import request from '../utils/request'

const updateSelf = game => {

  game.container.body.velocity.set(0, 0);
  game.isMoving = false;
  game.isMovingX = false;
  let velocity = 250;

  const setSprite = sprite => {
    if(game.user.sprite === sprite)
      return

    console.log('old sprite: ', game.user.sprite, 'new sprite: ', sprite)

    game.player.setTexture(sprite)
    game.user.sprite = sprite
    
    const options = {body : {user: game.user}, method: 'PUT'}

    request('/api/user/update', options).catch(error => {
      console.log(error)
    })
  }

  if(game.keyShift.isDown)
    velocity *= 2

  game.key1.on('down', () => setSprite('tritondude'))
  game.key2.on('down', () => setSprite('sungod'))
  game.key3.on('down', () => setSprite('queen'))
  game.key4.on('down', () => setSprite('neptune'))
  game.key5.on('down', () => setSprite('pokeman'))

  //Reset player position to Geisel
  game.keyEnter.on('down', function(event) {
    game.container.x = 1000*game.boothCount - 128
    game.container.y = 200
  });

  //TODO: Fix animations so that sprite always stops at standing frame
  if (game.keyA.isDown) {
    game.container.body.setVelocityX(-velocity);
    game.isMoving = true;
    game.isMovingX = true;
    game.player.anims.play('walkLeft-' + game.user.sprite, true);
    game.standFrame = 4
    game.doUpdate = true
  } else if (game.keyD.isDown) {
    game.container.body.setVelocityX(velocity);
    game.isMovingX = true;
    game.isMoving = true;
    game.player.anims.play('walkRight-' + game.user.sprite, true);
    game.standFrame = 8
    game.doUpdate = true
  }

  if (game.keyW.isDown) {
    game.container.body.setVelocityY(-velocity);
    game.isMoving = true;
    if (!game.isMovingX) {
      game.player.anims.play('walkUp-' + game.user.sprite, true);
      game.standFrame = 12
    }

    game.doUpdate = true
  } else if (game.keyS.isDown) {
    game.container.body.setVelocityY(velocity);
    game.isMoving = true;
    if (!game.isMovingX) {
      game.player.anims.play('walkDown-' + game.user.sprite, true);
      game.standFrame = 0
    }

    game.doUpdate = true
  }
  if(!game.isMoving){
    game.player.anims.stop(null, true);
    game.player.setFrame(game.standFrame);
    game.doUpdate = false
  }

  // Socket Update
  if(game.doUpdate)
    game.socket.emit('move-player', {
      x: game.container.x,
      y: game.container.y,
      vx: game.container.body.velocity.x,
      vy: game.container.body.velocity.y,
      sprite: game.user.sprite,
      playerId: game.socket.id
    });
}

export default updateSelf
