let knifeX, knifeY; // 
let bloodSplatters = []; // Array to store blood splatter objects

function setup() {
  createCanvas(innerWidth, 1000);
  knifeX = width / 2; // Initialize knife position to center of canvas
  knifeY = height / 2;
}

function draw() {
  background("purple");
  
  // pair knife to mouse position
  knifeX = mouseX;
  knifeY = mouseY;
  
  // Draw knife
  drawKnife(knifeX, knifeY);
  
  // Check if mouse is pressed to create blood splatters
  if (mouseIsPressed) {
    createBloodSplatter(knifeX, knifeY);
  }
  
  // Update and display blood splatters
  for (let i = 0; i < bloodSplatters.length; i++) {
    bloodSplatters[i].update();
    bloodSplatters[i].display();
  }
}

function drawKnife(x, y){
  push();
  fill("black");
  // Draw handle of knife
     rectMode(CORNER);
  rect(x - 20, y - 10, 100, 20);
  //Draw blade of knife
    fill(100);
  triangle(x+90, y-9, x+80, y +10, x + 200, y);
  pop();
}

// Function to create a blood splatter object
function createBloodSplatter(x, y) {
  // Calculate the position of the blade tip (the third vertex of the triangle)
  let bladeTipX = x + 200;
  let bladeTipY = y;
  
  let splatter = {
    x: bladeTipX, // Use the position of the blade tip
    y: bladeTipY,
    size: random(5, 20),
    shape: random(3, 8),
    display: function() {
      noStroke();
      fill(255, 0, 0, 150);
      ellipse(this.x, this.y, this.size, this.size);
    },
    update: function() {
      this.x += random(-3, 3);
      this.y += random(-3, 3);
    }
  };
  bloodSplatters.push(splatter);
}