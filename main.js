paralyzed = "";
happy_face = "";

leftX = 0;
leftY = 0;

leftScore = 0;
paralyzed_status = "";

rightScore = 0;
happy_status = "";

rightX = 0;
rightY = 0;

function preload(){
    paralyzed = loadSound("Paralyzed.mp3");
    happy_face = loadSound("Happy Face.mp3");
}

function setup(){
    canvas = createCanvas(500, 400);

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

        leftScore = results[0].pose.keypoints[9].score;
        rightScore = results[0].pose.keypoints[10].score;

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

    paralyzed_status = paralyzed.isPlaying();
    fill("#dc7aff");
    stroke("#ffffff");

    if(leftScore > 0.2){
        circle(leftX, leftY, 20);
        happy_face.stop();

        if(paralyzed=="false"){
            paralyzed.play();
            document.getElementById("button").innerHTML = "Song - Paralyzed by Sueco";
        }
    }

    happy_status = happy_face.isPlaying();
    fill("#dc7aff");
    stroke("#ffffff");

    if(rightScore > 0.2){
        circle(rightX, rightY, 20);
        paralyzed.stop();

        if(happy_face=="false"){
            happy_face.play();
            document.getElementById("button").innerHTML = "Song - Happy Face by The Jaguar Twins";
        }
    }
}