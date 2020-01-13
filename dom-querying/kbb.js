// https://www.kbb.com/suv/
// IIFE
(function () {
    console.log(this);
    const groupedDivs = Array.from(document.querySelectorAll('#contentContainer > div[id]'));
    // Array.from
    // console.log(groupedDivs);
    const arr = groupedDivs.map(subGroupContainer => {
        const data = getItemsFromType(subGroupContainer);
        const details = data.items.map(getDetailsForItem);
        return {
            label: data.label,
            details
        };
    });
    // const details = getDetailsForItem(items[0]);
    console.log(arr);
    function getItemsFromType(containerElement) {
        // console.log(containerElement);
        // get the label for the sub group
        const label = containerElement.querySelector('h2').innerText;
        console.log(label);
        // get the children data ...
        const items = Array.from(containerElement.children[1].children); // lastElementChild
        const lastElement = items[items.length - 1];
        if (/see more/i.test(lastElement.innerText)) {
            // perform using dispatch
            // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
            // lastElement.click();
        }
        return {
            label,
            items: items.slice(0, -1)
        };
    }
    function getDetailsForItem(containerElement) {
        const details = {};
        console.log(containerElement);
        const img = containerElement.querySelector('img'); // HTMLElement
        // getAttribute and setAttribute
        details.img = img.getAttribute('src');
        details.alt = img.getAttribute('alt');
        details.name = containerElement.querySelector('[itemprop="name"]').innerText;
        details.fuelEconomy = containerElement.querySelector('[title="Combined Fuel Economy"]').innerText;
        details.horsePower = containerElement.querySelector('[title="Horsepower"]').innerText;
        return details;
    }
    function getInnerText(elem) {
        return elem ? elem.innerText : '';
    }
}());
