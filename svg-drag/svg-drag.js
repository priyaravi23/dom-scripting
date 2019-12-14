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
    const line = document.querySelector('svg > path');
    console.log(line);

    window.addEventListener('mouseup', (e) => {
        // pick a random color between #000000 and #FFFFFF
        const color = Math.round(Math.random() * 0xFFFFFF);
        const fill = '#' + color.toString(16).padStart(6,'0');

        // apply color to the element that is clicked
        e.target.style.fill = fill
    });

    rect.addEventListener('mousemove', (e) => {
        findPosition(e);
    });

    circle.addEventListener('click', (event) => {
        event.preventDefault();
        console.log(event);
        circle.setAttributeNS(null, 'r', 40);

        circle.addEventListener('mousemove', (e) => {
            circle.style.top = (e.clientY - circle.offsetTop) + 'px';
            circle.style.left = (e.clientX - circle.offsetLeft) + 'px';
        })
    });

    function findPosition(e) {
        let x = e.clientX;
        let y = e.clientY;
        let coor = "The mouse is at: (" + x + "," + y + ")";
        console.log(coor);
    }
}
