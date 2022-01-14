function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet", modelLoaded);
  background("pink");
}

function draw() {
  image(video, 0, 0, 400, 400);
  classifier.classify(video, gotResult);
}

function modelLoaded() {
  console.log("inside the modelLoaded function");
}

previousResult = "";
function gotResult(error, result) {
  if(error) {
    console.error(error);
  }
  else {
    if((result[0].confidence > 0.5) && (previousResult != result[0].label)) {
      console.log(result);
      previousResult = result[0].label;
      var synth = window.speechSynthesis;
      speakingData = "The object that is detected is: " + result[0].label;
      var utterThis = new SpeechSynthesisUtterance(speakingData);
      synth.speak(utterThis);
      document.getElementById("object").innerHTML = result[0].label;
      document.getElementById("accuracy").innerHTML = Math.round(result[0].confidence * 100) + "%";
    }
  }
}