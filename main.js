input_val = "";
cocossd_status = "";

function setup() {
    canvas = createCanvas(400, 350);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function draw() {
    image(video, 0, 0, 400, 350);
}

function start() {
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    input_val = document.getElementById("object_taker").value;
}

function modelLoaded() {
    console.log("Model loaded!");
    cocossd_status = true;
}