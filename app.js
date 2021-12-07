var px = 50;
var py = 50;
var vx = 0.0;
var vy = 0.0;
var refreshRate = 1/60;

function getAccel() {
    DeviceMotionEvent.requestPermission().then(res => {
        if (res == "granted") {
            //hide button when permission granted
            document.getElementById("accelPermsBtn").classList.add("hide");

            window.addEventListener('deviceorientation', (event) => {
                frontToBack_degrees = event.beta;
                leftToRight_degree = event.gamma;
                

                vx += leftToRight_degree * refreshRate;
                vy += frontToBack_degrees * refreshRate;

                px += vx * 0.3;
                if (px > 98 || px < 0) {
                    px = Math.max(0, Math.min(98, px));
                    vx = 0;
                }

                py += vy * 0.3;
                if (py > 98 || py <0) {
                    py = Math.max(0, Math.min(98, py));
                    vy = 0;
                }

                dot = document.getElementsByClassName("indicatorDot")[0];
                dot.setAttribute('style', "left:" + (px) + "%;" + "top:" + (py) + "%")



                
            })
        } 
    });
}