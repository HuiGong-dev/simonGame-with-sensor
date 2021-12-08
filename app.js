var ball = document.querySelector('.ball');
var container = document.querySelector('.container');
var output = document.querySelector('.output');

var maxX = container.clientWidth - ball.clientWidth;
var maxY = container.clientHeight - ball.clientHeight;

function handleOrientation(event) {
    var x = event.beta;
    var y = event.gamma;

    output.textContent = `beta: ${x}\n`
    output.textContent += `gamma: ${y}\n`

    // constrain x value to range [-90, 90]
    if (x > 90)  { x = 90};
    if (x < -90) { x = -90};

    //shift x y range to [0,180] to ease computation
    x += 90;
    y += 90;
    // ball half size is 10px
    ball.style.left = Math.max(0, (maxY * y / 180 - 10)) + "px";
    ball.style.top = Math.max(0, (maxX * x / 180 - 10)) + "px";
}


// var px = 50;
// var py = 50;
// var vx = 0.0;
// var vy = 0.0;
// var refreshRate = 1 / 60;

// const height = window.screen.height;
// const width = window.screen.width;

// console.log("screen height: " + height + " width: " + width);

function getAccel() {
    DeviceMotionEvent.requestPermission().then(res => {
        if (res == "granted") {
            //hide button when permission granted
            document.getElementById("accelPermsBtn").classList.add("hide");

            window.addEventListener('deviceorientation', handleOrientation);



            // window.addEventListener('deviceorientation', (event) => {
            //     frontToBack_degrees = event.beta;
            //     leftToRight_degree = event.gamma;

            //     vx += leftToRight_degree * refreshRate;
            //     vy += frontToBack_degrees * refreshRate * 0.5;

            //     px += vx * 0.3;
            //     if (px > 92 || px < 0) {
            //         px = Math.max(0, Math.min(92, px));
            //         vx = 0;
            //     }

            //     py += vy * 0.3;
            //     if (py > 95 || py < 0) {
            //         py = Math.max(0, Math.min(95, py));
            //         vy = 0;
            //     }

            //     dot = document.getElementsByClassName("ball")[0];
            //     dot.setAttribute('style', "left:" + (px) + "%;" + "top:" + (py) + "%")
            //     console.log("px: " + px + " py: " + py)

            // })
        }
    });
}