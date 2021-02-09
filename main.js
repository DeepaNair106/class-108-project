

prediction = "";


Webcam.set({
    width:300,
    height:300,
    image_format:"png",
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach(camera);

function take_snapshot(){
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = '<img id="image_captured" src ='+ data_uri +'></img>';

    });
}

console.log('ml5 version',ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/9fFQy9gLV/model.json", modelLoaded);

function modelLoaded(){
    console.log('model loaded');
}

function check(){
    img = document.getElementById("image_captured");
    classifier.classify(img, gotResult);
}

function speak() {
    var synth = window.speechSynthesis;
    speak_1 = "The prediction is "+prediction;
    var utter = new SpeechSynthesisUtterance(speak_1);
    synth.speak(utter);
}


function gotResult(error,result){
    if(error){
        console.error(error);
    
    }
    else{
        console.log(result);

        prediction = result[0].label;
        

        document.getElementById("gesture_name").innerHTML = prediction;
        

        speak();
        if (prediction == "Victory"){
            document.getElementById("emoji").innerHTML = "&#128076;";
        }

        if(prediction == "Thumbs Up"){
            document.getElementById("emoji").innerHTML = "&#128077;";
        } 

        if (prediction == "Peace"){
            document.getElementById("emoji").innerHTML = "&#9996;";
        } 

        if (prediction == "Fist"){
            document.getElementById("emoji").innerHTML = "&#9994;";
        }
        
    }
}
