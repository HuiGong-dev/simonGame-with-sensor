var px = 50;
var py = 50;
var vx = 0.0;
var vy = 0.0;
var refreshRate = 1/60;

function getAccel() {
    DeviceMotionEvent.requestPermission().then(res => {
        if (res == "granted") {
            // window.addEventListener('devicemotion', (event) => {
            //     console.log(event);
            // });

            window.addEventListener('deviceorientation', (event) => {
                rotation_degrees = event.alpha;
                frontToBack_degrees = event.beta;
                leftToRight_degree = event.gamma;
                console.log("rotation: " + rotation_degrees 
                + " front to back degrees: " + frontToBack_degrees 
                + " left to right degree: " + leftToRight_degree);

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