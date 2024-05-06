var capture;
var tracker;
var w = 640,
    h = 480;
var mouthOpenThreshold = -10; // Adjust this threshold
var cigaretteLength = 150;
var cigaretteWidth = 15;

function setup() {
    capture = createCapture({
        audio: false,
        video: {
            width: w,
            height: h
        }
    }, function() {
        console.log('capture ready.')
    });
    capture.elt.setAttribute('playsinline', '');
    createCanvas(w, h);
    capture.size(w, h);
    capture.hide();

    colorMode(HSB);

    tracker = new clm.tracker();
    tracker.init();
    tracker.start(capture.elt);
}

function draw() {
    image(capture, 0, 0, w, h);
    var positions = tracker.getCurrentPosition();

    noFill();
    noStroke();
    beginShape();
    for (var i = 0; i < positions.length; i++) {
        vertex(positions[i][0], positions[i][1]);
    }
    endShape();

    noStroke();
    for (var i = 0; i < positions.length; i++) {
        //fill(map(i, 0, positions.length, 0, 360), 50, 100);
        ellipse(positions[i][0], positions[i][1], 4, 4);
       text(i, positions[i][0], positions[i][1]);
     textSize(0)
    }

    if (positions.length > 0) {
        var mouthTopY = positions[57][1]; // Changed index to 57 for top lip
        var mouthBottomY = positions[60][1]; // Changed index to 60 for bottom lip
        var mouthOpen = mouthBottomY - mouthTopY; // Calculate the vertical distance

        // Calculate the difference between current mouth open and threshold
        var difference = mouthOpenThreshold - mouthOpen;
        console.log('Difference to Threshold:', difference);

        // Check if mouth is open based on the difference in y-coordinates
       
        if (mouthOpen <= mouthOpenThreshold) {
            background(0);
            textSize(32);
            textAlign(CENTER, CENTER);
            fill("pink");
            text('smoking is bad____', width/2, height/2);
            text('smoking is bad____', width/2, height/3);
            text('smoking is bad____', width/2, height/4);
            text('smoking is bad____', width/2, height/5);
            text('smoking is bad____', width/2, height/6);
            text('smoking is bad____', width/2, height/7);
            text('smoking is bad____', width/2, height/8);
            text('smoking is bad____', width/2, height/9);
            text('smoking is bad____', width/2, height/10);
            text('smoking is bad____', width/2, height/11);
            text('smoking is bad____', width/2, height/12);
            text('smoking is bad____', width/2, height/13);
            text('COUNT your days >_<', width/2, height/1.2);
        } else {
            drawCigarette(positions[62][0], positions[62][1]);
        }
          
            // Draw anything else you like when mouth is closed
            // For example, you can draw the cigarette-like shape here
        
        }
}

function drawCigarette(x, y) {
    // Draw the white part of the cigarette
    fill(255); // White color for the cigarette tip
  stroke(1)
    var whiteLength = cigaretteLength * 0.75; // 3/4 of the cigarette length
    rectMode(CENTER);
    rect(x, y*1.4 + whiteLength * 0.5, cigaretteWidth, whiteLength*2, 5);

    // Draw the yellowish part of the cigarette
    fill(40, 100, 100); // Yellowish color for the cigarette filler
    rect(x, y*1.6- whiteLength * 0.5, cigaretteWidth, whiteLength, 5);
}
