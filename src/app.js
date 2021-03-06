var ball = document.querySelector('.ball');
var container = document.querySelector('.container');
var output = document.querySelector('.output');
var permissionGranted = false;


var maxX = container.clientWidth - ball.clientWidth;
var maxY = container.clientHeight - ball.clientHeight;
var thirdOfContainerHeight = container.clientHeight / 3.0;
var thirdOfContainerWidth = container.clientWidth / 3.0;
//last ball location. Used to compare last location and current location.
var lastBallLocation = "NOT_IN_TARGET";

var gamePattern = [];
var userClickPattern = [];
var level = 0;
var gameStarted = false;
var ballLocations = ["red", "blue", "green", "yellow"];

function nextSequence() {
    
    userClickPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomLocation = ballLocations[randomNumber];
    gamePattern.push(randomLocation);
    $("#" + randomLocation).fadeIn(200).fadeOut(200).fadeIn(200);
    
}

//click anywhere to start the game
$("#level-title").on("click", function () {
    if (permissionGranted && !gameStarted) {
        console.log("click to start the game...")
        $(".ball").css('left', '146px');
        $(".ball").css('top', '146px');
        $("#level-title").text("Level " + level);
        nextSequence();
        gameStarted = true;
        console.log(" game started ");
    }
});

function checkAnswer(currentLevel) {
    // debugger;
    console.log("check answer started...");
    if (gamePattern[currentLevel] == userClickPattern[currentLevel]) {
        console.log("success");

        if (userClickPattern.length == gamePattern.length) {
            console.log("game pattern: " + gamePattern);
            console.log("user click:   " + userClickPattern);
            console.log("prepare to call next sequence for next level");
            setTimeout(function () {
                // console.trace();
                nextSequence();
            }, 1000);
        }
    } else {
       
        console.log("wrong");
        // console.log("game pattern: " + gamePattern);
        // console.log("user click: " + userClickPattern);
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        var achievedLevel = level;

        startOver();
        // window.removeEventListener('deviceorientation', handleOrientation);
        $("#level-title").text("Level: " + achievedLevel  + ". Click Here to Restart");

        if (!permissionGranted) {
            document.getElementById("accelPermsBtn").style.display = "block";
            document.getElementById("level-title").style.display = "none";
        }


    }
    console.log("check answer finished");
}

function startOver() {
    gameStarted = false;
    // permissionGranted = false;
    level = 0;
    gamePattern = [];
    console.log("start over finished");
}


function handleOrientation(event) {
    // console.log("entered handle oritentation");
    if (gameStarted) {
        var x = event.beta;
        var y = event.gamma;
    
        // output.textContent = `beta: ${x}\n`
        // output.textContent += `gamma: ${y}\n`
    
        // constrain x value to range [-90, 90]
        if (x > 90) {
            x = 90
        };
        if (x < -90) {
            x = -90
        };
    
        //shift x y range to [0,180] to ease computation
        x += 90;
        y += 90;
    
        var left = Math.max(0, Math.min(maxY, (maxY * y / 180)));
        var top = Math.max(0, Math.min(maxX, (maxX * x / 180)));
        ball.style.left = left + "px";
        ball.style.top = top + "px";
        var currentBallLocation = getBallLocation(left, top);
        if (currentBallLocation != lastBallLocation && currentBallLocation != "NOT_IN_TARGET") {
            // output.textContent += `PRESS COLOR EVENT: ${currentBallLocation}\n`
            handlePressColorEvent(currentBallLocation);
        }
        lastBallLocation = currentBallLocation;
    
    }
    
}

function animatePress(currentBallLocation) {
    document.getElementById(currentBallLocation).classList.add(currentBallLocation + "-pressed");
    setTimeout(function () {
        document.getElementById(currentBallLocation).classList.remove(currentBallLocation + "-pressed");
    }, 250);
}

function handlePressColorEvent(currentBallLocation) {

    

    animatePress(currentBallLocation);
    if (gameStarted && userClickPattern.length < gamePattern.length) {
        userClickPattern.push(currentBallLocation);
        checkAnswer(userClickPattern.length - 1);
    }
    

}

function isInGreen(left, top) {
    if (left >= thirdOfContainerWidth &&
        left <= thirdOfContainerWidth * 2 - ball.clientWidth &&
        top >= 0 &&
        top <= thirdOfContainerHeight - ball.clientHeight) {
        return true;
    } else {
        return false;
    }
}

function isInRed(left, top) {
    if (left >= 0 &&
        left <= thirdOfContainerWidth - ball.clientWidth &&
        top >= thirdOfContainerHeight &&
        top <= thirdOfContainerHeight * 2 - ball.clientHeight) {
        return true;
    } else {
        return false;
    }
}

function isInBlue(left, top) {
    if (left >= thirdOfContainerWidth &&
        left <= thirdOfContainerWidth * 2 - ball.clientWidth &&
        top >= thirdOfContainerHeight * 2 &&
        top <= maxX) {
        return true;
    } else {
        return false;
    }
}

function isInYellow(left, top) {
    if (left >= thirdOfContainerWidth * 2 &&
        left <= maxY &&
        top >= thirdOfContainerHeight &&
        top <= thirdOfContainerHeight * 2 - ball.clientHeight) {
        return true;
    } else {
        return false;
    }
}

function getBallLocation(left, top) {
    if (isInGreen(left, top)) {
        return "green"
    };
    if (isInRed(left, top)) {
        return "red"
    };
    if (isInBlue(left, top)) {
        return "blue"
    };
    if (isInYellow(left, top)) {
        return "yellow"
    };
    return "NOT_IN_TARGET";
}


function getAccel() {
    DeviceMotionEvent.requestPermission().then(res => {
        if (res == "granted") {
            permissionGranted = true;
            //hide button when permission granted
            console.log("permission granted");
            document.getElementById("accelPermsBtn").style.display = "none";
            document.getElementById("level-title").style.display = "block";
            
            window.addEventListener('deviceorientation', handleOrientation);
            
        }
    });
}