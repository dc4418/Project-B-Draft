let message = "Most Populous Black Nation On Earth";
let hiddenMessage = "_ _";

let NUM_OF_PARTICLES = 40; // Decide the initial number of particles.
let particles = [];

function setup() {
  createCanvas(600, 600);
  textAlign(CENTER, CENTER);
  textSize(30);

  // Generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), random(height), random(30, 40));
  }
}

function draw() {
  background(220);

  // Draw sand particles
  drawSandParticles();

  // Update and display particles
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
  }

  // Draw messages
  fill(0);
  text(message, width/2, height/2 - 50);
  text(hiddenMessage, width/2, height/2 + 50);
}

function keyPressed() {
  if (key === 'n' || key === 'e') {
    revealLetter(key);
  }
}

function revealLetter(letter) {
  if (letter === 'n') {
    hiddenMessage = letter.toUpperCase() + hiddenMessage.charAt(1);
  } else if (letter === 'e') {
    hiddenMessage = hiddenMessage.charAt(0) + letter.toUpperCase() + hiddenMessage.charAt(3);
  }
}

// Function to draw sand particles in the background
function drawSandParticles() {
  fill("grey");
  for (let i = 0; i < 100; i++) {
    let x = random(width);
    let y = random(height);
    ellipse(x, y, random(4, 8), random(4, 8)); // blood splatters
  }
}

class Particle {
  // constructor function
  constructor(startX, startY) {
    // properties: particle's characteristics
    this.x = startX;
    this.y = startY;
    this.dia = 30;
    this.vx = random(-1, 1); // velocity x
    this.vy = random(-1, 1); // velocity y
    this.ax = 0; // x direction acceleration
    this.ay = 0; // y direction acceleration
    this.maxSpeed = 3; // max speed
  }

  // methods (functions): particle's behaviors
  update() {
    // movement
    this.ax += random(-0.1, 0.1);
    this.ay += random(-0.1, 0.1);

    // Acceleration Constrain
    if (this.ax < -0.1) this.ax = -0.1;
    if (this.ax > 0.1) this.ax = 0.1;
    if (this.ay < -0.1) this.ay = -0.1;
    if (this.ay > 0.1) this.ay = 0.1;

    // Update Velocity
    this.vx += this.ax;
    this.vy += this.ay;

    // Velocity Constrain
    if (this.vx < -this.maxSpeed) this.vx = -this.maxSpeed;
    if (this.vx > this.maxSpeed) this.vx = this.maxSpeed;
    if (this.vy < -this.maxSpeed) this.vy = -this.maxSpeed;
    if (this.vy > this.maxSpeed) this.vy = this.maxSpeed;

    // Update Position
    this.x += this.vx;
    this.y += this.vy;

    // Respawn Points
    if (this.x < -this.dia) this.x = width + this.dia;
    if (this.y < -this.dia) this.y = height + this.dia;
    if (this.x > width + this.dia) this.x = -this.dia;
    if (this.y > height + this.dia) this.y = -this.dia;
  }

  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);
    fill("red");
    noStroke();
    circle(0, 0, random(20,30));
    pop();
  }
}