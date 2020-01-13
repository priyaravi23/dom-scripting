// https://www.kbb.com/hatchback/

(function () {
    // console.log(this);
    const container = Array.from(document.querySelectorAll('#contentContainer > div[id]'));
    // console.log(container);

    const arr = container.map((elem) => {
        const type = getCarType(elem);
        const details = getDetailsForItem(elem);
        const rating = getRating(elem);

        return {
            make: type,
            details,
            rating
        }
    });
    console.log(arr);
}());

function getCarType(elem) {
    return elem.querySelector('div[id] > h2').innerText;
}

function getDetailsForItem(elem) {
    const details = {};
    const img = elem.querySelector('.css-ktinsn img[alt]');
    // getAttribute and setAttribute
    details.img = img.getAttribute('src');
    details.model = img.getAttribute('alt');
    details.fuelEconomy = elem.querySelector('[title="Combined Fuel Economy"] > div').innerText;
    details.horsePower = elem.querySelector('[title="Horsepower"] > div').innerText;
    return details;
}

function getRating(elem) {
    const review = {};
    review.kbb = elem.querySelector('div[itemprop="review"] div > span').innerText;
    review.consumer = elem.querySelector('div[title="Consumer Rating"] div > span]').innerText;
    return review;
}