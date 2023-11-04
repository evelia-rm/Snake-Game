/*
Modified version 2023 for practice. 

Goals of the modification: 
- Modify snake movement (make it stay on canvas)
- Improve ball speed 
- Fix starting and ending screens 
- Adding levels and possibly more backgrounds 
- Improve ball and snake collision
*/

//collide 2D is linked - you can check the HTML!

//Sound variables
var toneSound;


//Snake Varibales
let snakeX = 200;
let snakeY = 200;

//x and y postion variables for ball
let xPos;
let yPos;

//Points variable
let points = 0;

//Timer variable
let ballTimer = 30;

//End text
let endText = "Game completed";

//Ending Screen 
let endScreen;

function preload() {
  toneSound = loadSound("tone.wav");
}

function setup() {
  createCanvas(500, 500); //change as needed
 

  var button = createButton("Start");
  button.mousePressed(startOver);
  button.position(20, 200);

  ballColors = [
    color(241, 201, 255),
    color(220, 125, 255),
    color(242, 22, 103),
    color(39, 144, 253),
  ];
}

function draw() {
  background(0);

  //Background function
  lineBackdrop(0, 50, 36);

  //Ball Timer function
  bolaTimer();

  //Snake function
  createSnake();

  //Points function
  playerPuntos();

  strokeWeight(3);
  stroke(197, 139, 231); //Purple
  fill(255);
  textSize(15);
  text("Points: " + points, 20, 20);
  
  
  if(endScreen == 1){
    gameOver();
   
    frameCount = 0 
    
    snakeX = 0;
    snakeY = 0;
    button.hide()
    
  }
}

function startOver() {
  points = 0;
}

function gameOver(){
  background(0);
  noStroke()
  fill(217, 50, 128); //Pink
  textSize(30);
  text(endText, 125, 250);
}

function playerPuntos() {
  if (points < 25) {
    if (collideRectCircle(snakeX, snakeY, 40, 35, xPos, yPos, 50)) {
      //Adding points
      points = points + 1;
      console.log(points);

      // Chime sound playing
      toneSound.play();
      toneSound.stop(1);
    }
  } else {
    if (points == 25) {
      background(0);
      alert("Congratulations! You've won 🎉")
      points = 0;
      
      let continueGame = confirm("Play again?");
      if (continueGame == true) {
        alert("Press the start button to play again");
      } else if (continueGame == false) {
        endScreen = 1
      }
    }
  }
}

function bolaTimer() {
  //Timer conditionals
  if (frameCount % 60 == 10 && ballTimer > 0) {
    ballTimer--;
    xPos = random(width);
    yPos = random(height);

    // console.log(ballTimer)
  }

  // When the time left in ballTimer is divisable by 1, then the ball will appear
  if (ballTimer % 1 == 0) {
    noStroke();
    fill(ballColors[int(random(ballColors.length))]);
    circle(xPos, yPos, 50);
  }

  //Will keep the timer running indefinitely (if timer  = 0, then it will reset back to 25)
  if (ballTimer <= 0) {
    ballTimer = 30;
  }
}

function lineBackdrop(paloX, lineX, lineY) {
  //For loop & conditionals for line background
  for (paloX; paloX <= 10; paloX++) {
    strokeWeight(3);
    rect(paloX * lineX, lineY, 0, 500);


    if (paloX % 2 == 0) {
      stroke(217, 50, 128); //Pink line
    } else if (lineX % 5 == 0) {
      stroke(161, 145, 251); //Purple line
    } else {
      stroke(133, 222, 242); //Blue line
    }
  }

  //For loop for background small rectangles
  for (let x = 0; x <= 5; x++) {
    for (let y = 10; y <= 500; y += 45) {
      noStroke();
      fill(x * 25, y / 2, 100);
      rect(x * 150, y, 10, 5);
    }
  }
}

function createSnake() {
  fill(255); //white
  stroke(217, 50, 128); //Pink
  rect(snakeX, snakeY, 40, 35);

  noStroke();
  fill(138, 3, 140); //Purple
  rect(snakeX + 5, snakeY + 5, 30, 10);
  fill(102, 216, 242); //Light blue
  rect(snakeX + 5, snakeY + 20, 30, 10);

  //Key pressed conditionals
  if (keyCode == RIGHT_ARROW) {
    snakeX = snakeX + 5;
  }
  if (keyCode == LEFT_ARROW) {
    snakeX = snakeX - 5;
  }
  if (keyCode == UP_ARROW) {
    snakeY = snakeY - 5;
  }
  if (keyCode == DOWN_ARROW) {
    snakeY = snakeY + 5;
  }

  //Conditionals to make "snake" stay on-canvas
  if (snakeX > width || snakeX < 0) {
    snakeX *= -1;
  }
  if (snakeY > height || snakeY < 0) {
    snakeY *= -1;
  }
  
}
