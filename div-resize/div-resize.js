document.addEventListener('readystatechange', () => {
    if (document.readyState === 'interactive') {
        init();
    }
});

function init() {
    let box = document.getElementById('box');
    let resizeHandle = document.getElementById('handle');
    let isMouseDown = false;
    console.log(box, isMouseDown, resizeHandle);

    document.body.addEventListener('mousedown', () => {
        isMouseDown = true;
    });

    document.body.addEventListener('mouseup', () => {
        isMouseDown = false;
    });

    document.body.addEventListener('mousemove', (e) => {
        if (isMouseDown) {
            console.log(e.clientX, e.clientY);
        }
    });

    resizeHandle.addEventListener('mousedown', () => {
        document.body.addEventListener('mousemove', (e) => {
            box.style.width = (e.clientX - box.offsetLeft) + 'px';
            box.style.height = (e.clientY - box.offsetTop) + 'px';
        });

        // document.body.addEventListener('mouseup', (e) => {
        //     document.body.removeEventListener('mousemove');
        //     document.body.removeEventListener('mouseup');
        // });

    });
}