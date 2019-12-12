document.addEventListener('readystatechange', () => {
    if (document.readyState === 'interactive') {
        init();
    }
});

function init() {
    let box = document.getElementById('box');
    let resizeHandle = document.getElementById('handle');

    resizeHandle.addEventListener('mousedown', initializeResize, false);

    function initializeResize(e) {
        window.addEventListener('mousemove', startResizing, false);
        window.addEventListener('mouseup', stopResizing, false);
    }

    function startResizing(e) {
        box.style.width = (e.clientX - box.offsetLeft) + 'px';
        box.style.height = (e.clientY - box.offsetTop) + 'px';
    }
    function stopResizing(e) {
        window.removeEventListener('mousemove', startResizing, false);
        window.removeEventListener('mouseup', stopResizing, false);
    }
}
