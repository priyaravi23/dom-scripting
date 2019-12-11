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


document.addEventListener('readystatechange', () => {
    if (document.readyState === 'interactive') {

        const circle = createCircle();
        const {clientHeight, clientWidth} = circle;

        console.log('here ... ');
        document.body.addEventListener('contextmenu', (event) => {

            event.preventDefault();
            console.log(event);
            const {x, y} = event;
            circle.setAttribute('style', `left: ${x - clientWidth / 2}px; top: ${y - clientHeight / 2}px;`);
            console.log(`The mouse is at ... `, x, y);
        });
    }
});