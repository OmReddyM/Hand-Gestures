prediction = "";
Webcam.set({
    width:350, height: 300, image_format: 'png', png_quality: 90
})

camera = document.getElementById("camera");
Webcam.attach("#camera");

function takeSnapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("snapshot").innerHTML = "<img id='capturedImage' src='" + data_uri +"'>";
    })
}

console.log('ml5 version = ', ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/MMo5cPdLf/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model Loaded");
}

function speak() {
    data = "The prediction is " + prediction;
    utterance = new SpeechSynthesisUtterance(data);
    window.speechSynthesis.speak(utterance);
}