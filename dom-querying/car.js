// https://www.mbusa.com/en/cpo
// IIFE
(function () {
    // console.log(this);
    const container = Array.from(document.querySelectorAll('.offer'));
    // console.log(container);

    const arr = container.map((elem) => {
        const img = elem.querySelector('.offer .offer__jellybean > img');
        // console.log(img);
        const type = getCarType(elem);
        const rate = getFinanceRate(elem);

        return {
            img,
            model: type,
            financeRate: rate
        }
    });
    console.log(arr);

    function getCarType(elem) {
        return elem.querySelector('.offer__info > div > span').innerText;
    }

    function getFinanceRate(elem) {
        return elem.querySelector('.offer__general span span').innerText;
    }
}());
