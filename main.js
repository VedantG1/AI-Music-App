var song1, song2, statusOfSong1, statusOfSong2 = ""
var leftX, leftY, rightX, rightY, scoreLeftWrist, scoreRightWrist = 0

function preload() {
    song1 = loadSound("music.mp3")
    song2 = loadSound("music2.mp3")
}
function setup() {
    canvas = createCanvas(600, 500)
    canvas.position(465, 190)
    video = createCapture(VIDEO)
    video.hide()

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on("pose", gotPoses)
}
function draw() {
    image(video, 0, 0, 600, 500)

    statusOfSong1 = song1.isPlaying()
    statusOfSong2 = song2.isPlaying()

    if (scoreRightWrist > 0.2) {
        song1.stop()

        if (statusOfSong2 == false) {
            song2.play()
            document.getElementById("songName").innerHTML = "Song Name : Peter Pan Song"
        }
    }

    if (scoreLeftWrist > 0.2) {
        song2.stop()

        if (statusOfSong1 == false) {
            song1.play()
            document.getElementById("songName").innerHTML = "Song Name : Harry Potter Theme Song"
        }
    }
}
function modelLoaded() {
    console.log("PoseNet is intialized")
}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results)
        scoreRightWrist = results[0].pose.keypoints[10].score
        scoreLeftWrist = results[0].pose.keypoints[9].score
        leftX = results[0].pose.leftWrist.x
        leftY = results[0].pose.leftWrist.y
        rightX = results[0].pose.rightWrist.x
        rightY = results[0].pose.rightWrist.y
        console.log("Left Wrist X - " + leftX + " Left Wrist Y - " + leftY)
        console.log("Right Wrist X - " + rightX + " Right Wrist Y - " + rightY)
    }
    else {
        console.log("Error!")
    }
}