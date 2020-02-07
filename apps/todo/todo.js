document.addEventListener('readystatechange', () => {
    if (document.readyState === 'interactive') {
        init();
    }
});

function init() {
    let add = document.getElementById('add');
    let input = document.getElementsByClassName("input-container");
    let remove = document.getElementsByClassName('remove');

    add.addEventListener('click', addField);
    remove[0].addEventListener('click', removeField);

    input[0].childNodes[1].focus();
}

function addField() {
    let input = document.getElementsByClassName("input-container");
    let remove = document.getElementsByClassName('remove');

    let clone = input[0].cloneNode(true);
    let latestInput = document.getElementById("list-container").appendChild(clone);
    latestInput.childNodes[1].value = '';
    latestInput.childNodes[1].focus();
    remove[remove.length - 1].addEventListener('click', removeField);
}

function removeField() {
    let input = document.getElementsByClassName("input-container");

    if (input.length > 1) {
        var child = this.parentElement.parentElement;
        child.parentNode.removeChild(child);
    }
};