function attachHandlers() {
    const divs = Array.from(document.querySelectorAll('thead th > div:last-child'));

    // attach sort handlers
    const sortClickHandler = (e) => {
        const {prop} = e.target.dataset;
        console.log(prop);
        model.headings[prop].sortState = !model.headings[prop].sortState;
        model.sortProp = prop;
        console.time('sort');
        // updateThWithVisuals()
        // Create a new array
        const newReviewsArr = [...model.reviews];
        sortBy(newReviewsArr, prop, model.headings[prop].sortState);
        console.log(newReviewsArr.map(r => r.price));
        console.timeEnd('sort');
        console.time('render');
        updateHeadingsWithSortState();
        renderRows(newReviewsArr, document.querySelector('.container tbody'));
        console.timeEnd('render');
        console.log(model);
    };

    divs.forEach(div => div.addEventListener('click', sortClickHandler));

    /** attach search handlers
        The blur event fires when an element has lost focus. focusout even bubbles while blur does not
     **/

    const searchHandler = (e) => {
        const {dataset: {prop}, value} = e.target;
        model.headings[prop].filter = new RegExp(value, 'i');
        renderRows(model.reviews, document.querySelector('.container tbody'));
        console.log(model);
    };

    const input = document.querySelectorAll('thead th input');

    input.forEach(inputElement => inputElement.addEventListener('keyup', searchHandler));
}

function filterReviews(reviews, headings) {
    const headingEntries = Object.entries(headings);

    return reviews.filter(review => {
        return headingEntries.every(([prop, {filter}]) => {
            if (filter) {
                return filter.test(review[prop])
            } else {
                return true;
            }
        });
    });
}