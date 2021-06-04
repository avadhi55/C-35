var ball;
var db, position;

function setup(){
    createCanvas(500,500);
    db = firebase.database();

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    db.ref("Ball/Position").on("value", readPos, showErr);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){

   db.ref("Ball/Position").set({
       X: position.X + x,
       Y: position.Y + y
   });


}

function readPos(data){
    position = data.val();  //copies the data into position exactly

    ball.x = position.X;
    ball.y = position.Y;
}

function showErr(){
    console.log("ERROR IN DATABASE");
}

/*
.ref() - Refers to the location of data value

1. READ
    .on() - turns on a listener that listens to the value change in the data field
        2 more functions:
            a) Reads the value
            b) Error function - optional

2. WRITE
    .set() - updates the data field
*/
