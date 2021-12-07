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
                leftToRight_degree = event.gama;
                console.log("rotation: " + rotation_degrees 
                + " front to back degrees: "+ frontToBack_degrees + " left to right degree " + leftToRight_degree);
                
            })
        }
    });
}