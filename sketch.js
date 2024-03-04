//intialising variables for tilemap 

let tilemap = [];
let numDown = 12;
let numAcross = 12;
let tileSize = 50;
let textures = []; 



//- sprite: this will be the image we will be using for our player!
//startAcross and startDown will be the *tile coordinate* start positions. We’ll store these inside an ‘across’ and ‘down’ key inside our tiles.
//size will be the size of our player
//speed: how fast the player object can move
//tileRule: here we’ll store whether the tile is walkable or not (a 0 or a 1).



let graphicMap = [

//         THIS IS OUR Y AXIS
//0 1  2  3  4  5  6  7  8  9  10 11
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //0
[0, 6, 1, 1, 1, 1, 1, 1, 1, 1, 5, 0], // 1
[0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], // 2
[0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], // 3
[0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], // 4
[0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], // 5    THIS IS OUR X AXIS
[0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], // 6
[0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], // 7
[0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], // 8
[0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], // 9
[0, 8, 3, 3, 3, 3, 3, 3, 3, 3, 7, 0], // 10 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  // 11
]

let tileRules = [

//         THIS IS OUR Y AXIS
//0 1  2  3  4  5  6  7  8  9  10 11
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //0
[0, 6, 1, 1, 1, 1, 1, 1, 1, 1, 5, 0], // 1
[0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], // 2
[0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], // 3
[0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], // 4
[0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], // 5    THIS IS OUR X AXIS
[0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], // 6
[0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], // 7
[0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], // 8
[0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], // 9
[0, 8, 3, 3, 3, 3, 3, 3, 3, 3, 7, 0], // 10 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  // 11
]

//initialising variables for player one - monkey
let monkey;
let monkeySprite;
let monkeySpeed; 
let monkeySize = tileSize; 

//for bear
let bear;
let bearSprite;
let bearSpeed; 
let bearSize = tileSize; 

// for ball
let ball;
let ballSprite;
let ballSpeed;
let ballSize = tileSize ; 


function preload() {
    //tilemap textures
textures [0] = loadImage("grass.png") ; 
textures [1] = loadImage("grass1.png") ; 
textures [2] = loadImage("grass2.png") ; 
textures [3] = loadImage("grass3.png") ; 
textures [4] = loadImage("grass4.png") ; 
textures [5] = loadImage("grassUR.png") ; 
textures [6] = loadImage("grassUL.png") ; 
textures [7] = loadImage("grassBR.png") ; 
textures [8] = loadImage("grassBL.png") ; 



    //creating the monkey sprite
    monkeySprite = loadImage("monkey.png");
    //creating the bear sprite
    bearSprite = loadImage ("bear.png");
    //making the ball = zookeeper
    ballSprite = loadImage ("ball.png");
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function setup() {
    createCanvas (600,600) ;

    let tileID = 0; // sets our tileID for the first tile that we make 

    //Creates all tiles
    for (let across = 0; across < numAcross; across++) {
        tilemap[across] = [];
        for (let down = 0; down < numDown; down++) {
            //Setting Texture For Tile
            let textureNum = graphicMap[down][across];
    
            //Initialising Tile
            tilemap[across][down] = new Tile(textures[textureNum], across, down, tileSize, tileID); // THIS LINE CREATES OUR NEW TILE!

            tileID++;
        }
    }
    //Tile creation finished

    //Create Player
    monkey = new Monkey(monkeySprite, 2, 5, tileSize, monkeySpeed, tileSize, tileRules);
    bear = new Bear(bearSprite, 9, 5, tileSize, bearSpeed, tileSize, tileRules);
    ball = new Ball(ballSprite, ballSize, ballSpeed, tileSize, tileRules);

ball.setDirection(); //setting intial direction for ball


}


function draw() {
    background(0);
    
    // Loops through all tiles each time draw() is called
    for (let across = 0; across < numAcross; across++) {
        for (let down = 0; down < numDown; down++) {
            tilemap[across][down].display(); // runs display() method for each tile!
            tilemap[across][down].debug(); // runs debug() method for each tile!
        }
    }
    // Finishes looping through all tiles within each draw() loop

    monkey.display();
    monkey.move();

    bear.display();
    bear.move();

    ball.display();
    ball.move();


    //moving the players
if (keyIsDown(UP_ARROW) && bear.canMove()) {
        bear.yPos -= bear.speed;
    }
if (keyIsDown(DOWN_ARROW) && bear.canMove()) {
        bear.yPos += bear.speed;
    }
    
  // Handle monkey movement using arrow keys
if (keyIsDown(87) && monkey.canMove()) { // W key for UP
    monkey.yPos -= monkey.speed;
    }

if (keyIsDown(83) && monkey.canMove()) { // S key for DOWN
    monkey.yPos += monkey.speed;
    }

}



function keyPressed() {
    monkey.setDirection();
    bear.setDirection();
}


class Monkey {
    constructor(monkeySprite, startAcross, startDown, monkeySize, monkeySpeed, tileSize, tileRules) {
        //Attach sprite to key in object
        this.sprite = monkeySprite;

        //Store starting tile info. Later, we will use these to store the current tile the player is on.
        this.across = startAcross;
        this.down = startDown;
        
        //convert tile coordinates into pixel coordinates
        this.xPos = this.across * tileSize;
        this.yPos = this.down * tileSize;

        //storing size and speed
        this.size = monkeySize;
        this.speed = monkeySpeed;

        //Check rules/collisions for the tile the player wants to move to (target Tile)
        this.tileRules = tileRules;
        this.tileSize = tileSize;

        //some extra properties that we will use to control player movement below
        //what direction the player will travel in
        this.dirX = 0;
        this.dirY = 0;
        
        //whether the player is currently moving to another tile
        this.isMoving = false;
        
        //the x/y position of the tile the player is moving to (the target)
        this.tx = this.xPos; //set these to the initial player pos
        this.ty = this.yPos;
    
    }

    //    setDirection() {
            // Check if we're NOT currently moving...
      //      if (!this.isMoving) {
                // if not, then let's set the direction the player is traveling!
    
                // UP
        //        if (keyCode === "W") {
          //          this.dirX = 0;
            //        this.dirY = -1; // direction is up!
              //  }
    
                // DOWN
                //if (keyCode === "S") {
                  //  this.dirX = 0;
                    //this.dirY = 1; // direction is down!
   //             }
    //}

//}

    //This checks what tile the player wants to move to and if
    //the player is allowed to move there
    checkTargetTile() {
        //First, get what tile the player is currently on
        this.across = Math.floor(this.xPos / this.tileSize);
        this.down = Math.floor(this.yPos / this.tileSize);

        //Calculate the coordinates of the target tile
        let nextTileHorizontal = this.across + this.dirX;
        let nextTileVertical = this.down + this.dirY;

        //check is that tile is in bounds of the map
        // remember: && means AND (i.e. below is asking if ALL conditions are true)
        if (
            
            nextTileHorizontal >= 0 && //top of map
            nextTileHorizontal < numAcross && //bottom of map
            nextTileVertical >= 0 && //left edge of map
            nextTileVertical < numDown //right edge of map
        ) {
            //if it is in bounds, have we set it as moveable in our ruleMap:
            if (this.tileRules[nextTileVertical][nextTileHorizontal] != 1) { // remember we have to swap these!
                //if the target tile is walkable, then...
                //...calculate the precise x and y coordinate of the target tile...
                this.tx = nextTileHorizontal * this.tileSize;
                this.ty = nextTileVertical * this.tileSize;
                
                //Because the player is ready to move there, we can set isMoving to true!
                this.isMoving = true;
            }
        }
    }

    move() { 
        //This is in our draw loop, so called move() is called every frame BUT...
        if (this.isMoving) {
            //this code block will only activate when this.isMoving = true. Otherwise, nothing happens.
            //So first, start by moving in direction set by setDirection()
            this.xPos += this.speed * this.dirX;
            this.yPos += this.speed * this.dirY;

            //Now check if player has reached targetX
            if (this.xPos === this.tx && this.yPos === this.ty) {
                //if there, stop moving and reset our variables
                this.isMoving = false;
                this.dirX = 0;
                this.dirY = 0;
            }
        }
    }

    display() {
        imageMode(CORNER);
        image(this.sprite, this.xPos, this.yPos, this.size, this.size);
    }

}



    class Bear {
        constructor(bearSprite, startAcross, startDown, bearSize, bearSpeed, tileSize, tileRules) {
            //Attach sprite to key in object
            this.sprite = bearSprite;
    
            //Store starting tile info. Later, we will use these to store the current tile the player is on.
            this.across = startAcross;
            this.down = startDown;
            
            //convert tile coordinates into pixel coordinates
            this.xPos = this.across * tileSize;
            this.yPos = this.down * tileSize;
    
            //storing size and speed
            this.size = bearSize;
            this.speed = bearSpeed;
    
            //Check rules/collisions for the tile the player wants to move to (target Tile)
            this.tileRules = tileRules;
            this.tileSize = tileSize;
    
            //some extra properties that we will use to control player movement below
            //what direction the player will travel in
            this.dirX = 0;
            this.dirY = 0;
            
            //whether the player is currently moving to another tile
            this.isMoving = false;
            
            //the x/y position of the tile the player is moving to (the target)
            this.tx = this.xPos; //set these to the initial player pos
            this.ty = this.yPos;
        }




    //This checks what tile the player wants to move to and if
    //the player is allowed to move there
    checkTargetTile() {
        //First, get what tile the player is currently on
        this.across = Math.floor(this.xPos / this.tileSize);
        this.down = Math.floor(this.yPos / this.tileSize);

        //Calculate the coordinates of the target tile
        let nextTileHorizontal = this.across + this.dirX;
        let nextTileVertical = this.down + this.dirY;

        //check is that tile is in bounds of the map
        // remember: && means AND (i.e. below is asking if ALL conditions are true)
        if (
            
            nextTileHorizontal >= 0 && //top of map
            nextTileHorizontal < numAcross && //bottom of map
            nextTileVertical >= 0 && //left edge of map
            nextTileVertical < numDown //right edge of map
        ) {
            //if it is in bounds, have we set it as moveable in our ruleMap:
            if (this.tileRules[nextTileVertical][nextTileHorizontal] != 1) { // remember we have to swap these!
                //if the target tile is walkable, then...
                //...calculate the precise x and y coordinate of the target tile...
                this.tx = nextTileHorizontal * this.tileSize;
                this.ty = nextTileVertical * this.tileSize;
                
                //Because the player is ready to move there, we can set isMoving to true!
                this.isMoving = true;
            }
        }
    }
    

            move() {
                //This is in our draw loop, so called move() is called every frame BUT...
                if (this.isMoving) {
                    //this code block will only activate when this.isMoving = true. Otherwise, nothing happens.
                    //So first, start by moving in direction set by setDirection()
                    this.xPos += this.speed * this.dirX;
                    this.yPos += this.speed * this.dirY;
        
                    //Now check if player has reached targetX
                    if (this.xPos === this.tx && this.yPos === this.ty) {
                        //if there, stop moving and reset our variables
                        this.isMoving = false;
                        this.dirX = 0;
                        this.dirY = 0;
                    }
                }
            }
        
            display() {
                imageMode(CORNER);
                image(this.sprite, this.xPos, this.yPos, this.size, this.size);
            }
    
        }

        
    

class Ball {
    constructor(ballSprite, ballSize, ballSpeed, tileSize, tileRules) {
        this.sprite = ballSprite;
        this.size = ballSize;
        this.speed = ballSpeed;
        this.tileRules = tileRules;
        this.tileSize = tileSize;
        this.dirX = 0;
        this.dirY = 0;
        this.isMoving = false;
        this.tx = 0;
        this.ty = 0;
        this.randomizePosition();
    }

    randomizePosition() {

//collision map w a value that says if ball touches the tile then the value = reset 
//=delete ball, 
//minimum and maximum
// spawn the ball one tile in front of tile, need something to determine who serves, log the x (across) value



//randomize: Math.floor (take value and round down)


        let validPosition = false;
        while (!validPosition) {
            this.across = floor(random(numAcross));
            this.down = floor(random(numDown));
            if (this.tileRules[this.down][this.across] !== 1) {
                this.xPos = this.across * this.tileSize;
                this.yPos = this.down * this.tileSize;
                validPosition = true;
            }
        }
    }

    setDirection() {
        if (!this.isMoving) {
            let directions = [
                { dirX: -1, dirY: 0 }, // Left
                { dirX: 1, dirY: 0 },  // Right
                { dirX: 0, dirY: -1 }, // Up
                { dirX: 0, dirY: 1 }    // Down
            ];

            let randomDirection = random(directions);
            this.dirX = randomDirection.dirX;
            this.dirY = randomDirection.dirY;

            this.checkTargetTile();
        }
    }

    checkTargetTile() {
        let nextTileHorizontal = this.across + this.dirX;
        let nextTileVertical = this.down + this.dirY;

        if (
            nextTileHorizontal >= 0 &&
            nextTileHorizontal < numAcross &&
            nextTileVertical >= 0 &&
            nextTileVertical < numDown
        ) {
            if (this.tileRules[nextTileVertical][nextTileHorizontal] !== 1) {
                this.tx = nextTileHorizontal * this.tileSize;
                this.ty = nextTileVertical * this.tileSize;
                this.isMoving = true;
            }
        }
    }

    move() {
        if (this.isMoving) {
            this.xPos += this.speed * this.dirX;
            this.yPos += this.speed * this.dirY;

            if (dist(this.xPos, this.yPos, this.tx, this.ty) < this.speed) {
                this.isMoving = false;
                this.dirX = 0;
                this.dirY = 0;
                this.xPos = this.tx;
                this.yPos = this.ty;
                this.setDirection(); // Move to a new random direction
            }
        }
    }

    display() {
        imageMode(CORNER);
        image(this.sprite, this.xPos, this.yPos, this.size, this.size);
    }
}
        


class Tile {
    constructor(texture, across, down, tileSize, tileID) {
        this.texture = texture;
        this.across = across;
        this.down = down;
        this.xPos = across * tileSize;
        this.yPos = down * tileSize;
        this.tileSize = tileSize; // Added this line
        this.tileID = tileID;
    }

    display() {
        // Displays the texture of the instance of the Tile class
        noStroke();
        image(this.texture, this.xPos, this.yPos, this.tileSize, this.tileSize);
    }

    debug() {
        // Comment out or remove the lines below to hide grid lines and numbers
        // TILE
        // stroke(245);
        // noFill();
        // rect(this.xPos, this.yPos, this.tileSize, this.tileSize);

        // LABEL
        // noStroke();
        // fill(255);
        // textAlign(LEFT, TOP);
        // text(this.tileID, this.xPos, this.yPos);
    }
}











