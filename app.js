

function getAccel() {
    DeviceMotionEvent.requestPermission().then(res => {
        if (res == "granted") {
            window.addEventListener('devicemotion', (event) => {
                console.log(event);
            });

            window.addEventListener('deviceorientation', (event) => {
                console.log(event);
            })
        }
    });
}