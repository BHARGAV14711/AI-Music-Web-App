Bliss = "";
Trap = "";
LeftWristX =0;
LeftWristY =0;
RightWristX =0;
RightWristY =0;
ScoreLeftWrist = 0;
LeftWrist_Song1_Status = "";
ScoreRightWrist = 0;
RightWrist_Song2_Status = "";

function preload(){
    Bliss = loadSound("Luke-Bergs-Bliss.mp3");
    Trap = loadSound("Powerful-Trap-.mp3");
}
function setup(){
      canvas = createCanvas(475,475);
      canvas.position(530,220);

      video = createCapture(VIDEO);
      video.hide();

      poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw(){
 image(video,0,0,550,500);

 stroke("#FF6347");
    fill("#FF6347");

    LeftWrist_Song1_Status = Bliss.isPlaying()
    RightWrist_Song2_Status = Trap.isPlaying()

    if (ScoreLeftWrist > 0.2) {
        circle(LeftWristX, LeftWristY, 20);
        Trap.stop()
        LeftWrist_Song1_Status = true;

        if (LeftWrist_Song1_Status = false){
            Bliss.play();
            document.getElementById("song_name").innerHTML = Bliss;
        }
    }
    if (ScoreRightWrist > 0.2) {
        circle(RightWristX, RightWristY, 20);
        Bliss.stop()
        LeftWrist_Song1_Status = false;
    }
    if (LeftWrist_Song1_Status = true){
        document.getElementById("song_name").innerHTML = "Bliss"
    } else{
        document.getElementById("song_name").innerHTML = "Trap"
    }
}
function modelLoaded(){
    console.log("PoseNet is initialized.");
}
function gotPoses(results){
    if(results.length > 0){
      console.log(results);

      ScoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score Left Wrist =" + ScoreLeftWrist)

        ScoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Score Right Wrist =" + ScoreRightWrist)
    
      LeftWristX = results[0].pose.leftWrist.x;
      LeftWristY = results[0].pose.leftWrist.y;
      console.log("left wrist x = "+LeftWristX+", left wrist y = "+LeftWristY);
      
      RightWristX = results[0].pose.rightWrist.x;
      RightWristY = results[0].pose.rightWrist.y;
      console.log("right wrist x = "+RightWristX+", right wrist y = "+RightWristY);
   }
   }