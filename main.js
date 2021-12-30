prediction = "";
Webcam.set({
    width: 350, height: 300, image_format: 'png', png_quality: 90
})

camera = document.getElementById("camera");
Webcam.attach("#camera");

function takeSnapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("snapshot").innerHTML = "<img id='capturedImage' src='" + data_uri + "'>";
    })
}

console.log('ml5 version = ', ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/MMo5cPdLf/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model Loaded");
}

function predict() {
    img = document.getElementById("capturedImage");
    classifier.classify(img, getResults);
}

function getResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        prediction = results[0].label;

        document.getElementById("textResult").innerHTML = prediction;

        speak();

        if (prediction == "Spock") {
            document.getElementById("emojiResult").innerHTML = "&#128406";
        }
        if (prediction == "Yo Man") {
            document.getElementById("emojiResult").innerHTML = "&#129304";
        }
        if (prediction == "Superb") {
            document.getElementById("emojiResult").innerHTML = "&#128076";
        }
        if (prediction == "Thumbs Up") {
            document.getElementById("emojiResult").innerHTML = "&#128077";
        }
        if (prediction == "V For Victory") {
            document.getElementById("emojiResult").innerHTML = "&#9996";
        }
    }
}

function speak() {
    data = "The predicted gesture is " + prediction;
    utterance = new SpeechSynthesisUtterance(data);
    window.speechSynthesis.speak(utterance);
}