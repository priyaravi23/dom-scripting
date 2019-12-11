const createCircle = () => {
    // createElement to create a div that has a className of circle
    const left = 0;
    const top = 0;
    const circle = createElement({
        className: 'circle',
        elemType: 'div',
        attributes: [{
            name: 'style',
            value: `left: ${left}px; top: ${top}px;`
        }]
    });
    const parentNode = document.body.firstElementChild;
    const refNode = parentNode.firstElementChild;
    parentNode.insertBefore(circle, refNode);
    return circle;
};

const createElement = props => {
    const {className, elemType, handlers, attributes = []} = props;
    const element = document.createElement(elemType);
    element.setAttribute('class', className);
    attributes.forEach(({name, value}) => {
        element.setAttribute(name, value);
    });
    return element;
};


window.addEventListener('mouseup', (e) => {
    // pick a random color between #000000 and #FFFFFF
    const color = Math.round(Math.random() * 0xFFFFFF)
    const fill = '#' + color.toString(16).padStart(6,'0')

    // apply color to the element that is clicked
    e.target.style.fill = fill
})

window.addEventListener("mousemove", function(event) {
    myFunction(event);
});

function myFunction(e) {
    var x = e.clientX;
    var y = e.clientY;
    var coor = "The mouse is at: (" + x + "," + y + ")";
    console.log(coor);
}
