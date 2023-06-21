input_val = "";
cocossd_status = "";
objects = [];

function setup() {
    canvas = createCanvas(400, 350);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function draw() {
    image(video, 0, 0, 400, 350);

    if (cocossd_status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects detected";

            percent = floor(objects[i].confidence * 100);

            fill('red');
            textSize(16);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke('red');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label == input_val) {
                video.stop();
                objectDetector.detect(gotResult);

                document.getElementById("mention_status").innerHTML = input_val + " found";

                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(input_val + "found");
                synth.speak(utterThis);

            } else {
                document.getElementById("mention_status").innerHTML = input_val + " not found";
            }
        }
    }
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

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}