paralyzed = "";
happy_face = "";

leftX = 0;
leftY = 0;

rightX = 0;
rightY = 0;

function preload(){
    paralyzed = loadSound("Paralyzed.mp3");
    happy_face = loadSound("Happy Face.mp3");
}

function setup(){
    canvas = createCanvas(500, 400);
    canvas.position(500,200)

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet Is Initialized");
}

function gotPoses(){
    if(results.length > 0){
        console.log(results);

        leftX = results[0].pose.leftWrist.x;
        leftY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X - "+leftX+" Left Wrist Y - "+leftY);

        rightX = results[0].pose.rightWrist.x;
        rightY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X - "+rightX+" Right Wrist Y - "+rightY);
    }
}

function draw(){
    image(video, 0, 0, 500, 400);
}