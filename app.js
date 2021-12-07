var px = 50;
var py = 50;
var vx = 0.0;
var vy = 0.0;
var refreshRate = 1 / 60;

const height = window.screen.height;
const width = window.screen.width;

console.log("screen height: " + height + " width: " + width);

function getAccel() {
    DeviceMotionEvent.requestPermission().then(res => {
        if (res == "granted") {
            //hide button when permission granted
            document.getElementById("accelPermsBtn").classList.add("hide");



            window.addEventListener('deviceorientation', (event) => {
                frontToBack_degrees = event.beta;
                leftToRight_degree = event.gamma;


                vx += leftToRight_degree * refreshRate;
                vy += frontToBack_degrees * refreshRate * 0.5;

                px += vx * 0.3;
                if (px > 93 || px < 0) {
                    px = Math.max(0, Math.min(93, px));
                    vx = 0;
                }

                py += vy * 0.3;
                if (py > 95 || py < 0) {
                    py = Math.max(0, Math.min(95, py));
                    vy = 0;
                }









                dot = document.getElementsByClassName("indicatorDot")[0];
                dot.setAttribute('style', "left:" + (px) + "%;" + "top:" + (py) + "%")
                console.log("px: " + px + " py: " + py)




            })
        }
    });
}