class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(800, 400, 100, 100)
    car1.addImage("car1", car1_img)
    car2 = createSprite(1000, 400, 100, 100)
    car2.addImage("car2", car2_img)
    car3 = createSprite(1200, 400, 100, 100)
    car3.addImage("car3", car3_img)
    car4 = createSprite(1400, 400, 100, 100)
    car4.addImage("car4", car4_img)
    cars = [car1, car2, car3, car4]
  }

  play(){
    form.hide();
    textSize(30);
    Player.getPlayerInfo();

    if(allPlayers !== undefined)
    {
      image(track, 0, -displayHeight*4, displayWidth, displayHeight*5)

      var index = 0;

      var x = 0;
      var y;

      for(var plr in allPlayers){

        index = index + 1;

        x = 200 + (index * 200) + allPlayers[plr].xPos

        y = displayHeight - allPlayers[plr].distance

        cars[index - 1].x = x;
        cars[index - 1].y = y;

         if (index === player.index)
         {
           cars[index - 1].shapeColor = "red";
           camera.position.x = displayWidth/2;
           camera.position.y = cars[index - 1].y
         }
      }
    }

    if(player.distance < 2100)
    {

    if(keyIsDown(38) && player.index !== null)
    {
      yVel += 0.9;

      if(keyIsDown(37))
      {
        xVel -= 0.6;
      }

      if(keyIsDown(39))
      {
        xVel += 0.6;
      }
    }

    else if(keyIsDown(38) && player.index !== null)
    {
      yVel -= 0.9;
      xVel *= 0.9
    }

    xVel *= 0.985;
    yVel *= 0.985;

  }

    // if(player.distance > 4000)
    // {
    //   gameState = 2
    // }

    drawSprites();

     player.distance += 0.9;
     yVel *= 0.6;
     player.xPos += 0.9;
     xVel *= 0.985

    player.update()

  }

  end()
  {
     alert("Game Ends!")
  }
}
