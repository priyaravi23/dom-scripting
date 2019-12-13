document.addEventListener('readystatechange', () => {
    if (document.readyState === 'interactive') {
        init();
    }
});

function init() {
    const rect = document.querySelector('svg > rect');
    console.log(rect);
    const circle = document.querySelector('svg > circle');
    console.log(circle);

    window.addEventListener('mouseup', (e) => {
        // pick a random color between #000000 and #FFFFFF
        const color = Math.round(Math.random() * 0xFFFFFF);
        const fill = '#' + color.toString(16).padStart(6,'0');

        // apply color to the element that is clicked
        e.target.style.fill = fill
    });

    rect.addEventListener("mousemove", function(event) {
        myFunction(event);
    });

    circle.addEventListener('click', (event) => {
        event.preventDefault();
        console.log(event);
        circle.setAttributeNS(null, 'r', 40);
    });

    function myFunction(e) {
        let x = e.clientX;
        let y = e.clientY;
        let coor = "The mouse is at: (" + x + "," + y + ")";
        console.log(coor);
    }
}
