const model = {
    headings: {
        // propName: { sortState: 'asc', label: propName }
    },
    reviews: {

    },
    sortProp: undefined // price
};

/**
 * @desc Make an Api call to get data in the form of a json object
 * */

document.addEventListener('readystatechange', () => {
    if (document.readyState === 'interactive') {
        init();
    }
});

function init() {
    const promise = fetch('./wine-reviews.json');

    promise.then((res) => {
        if (res.ok) {
            res.json().then((data) => {
                // perform the model initialization
                postDataAccess(data);
                console.log(model);
                renderTable();
                // Attach sort handlers here
                attachHandlers(model);
            })
        }
    }, (err) => {
        console.log(err);
    });

}

/** Start utility functions */
const getGetHeadingsFromData = reviewsArr => {
    const set = new Set();
    reviewsArr.forEach(review => {
        Object.keys(review).forEach(prop => set.add(prop));
    });
    return [...set];
};

function sortBy(newReviewsArr, prop, asc) {
    // sort fn
    if (asc) {
        newReviewsArr.sort(compareFnAsc.bind(null, prop));
    } else {
        newReviewsArr.sort(compareFnDesc.bind(null, prop));
    }
    return newReviewsArr;
}

function compareFnAsc(prop, a, b) {
    if (a[prop] > b[prop]) return 1;
    else if (a[prop] < b[prop]) return -1;
    else return 0;
}

function compareFnDesc(prop, a, b) {
    if (a[prop] > b[prop]) return -1;
    else if (a[prop] < b[prop]) return 1;
    else return 0;
}

const createTdElement = (str, className) => {
    var td = document.createElement('td');
    td.setAttribute('class', className);
    td.innerHTML = str;
    return td;
};

/** End utility functions */


/**
 * @desc This function runs after we receive data from the backend
 * */

function postDataAccess(reviewsArr) {
    const headings = getGetHeadingsFromData(reviewsArr);
    // model.sortState = { 'region_1': undefined / 'asc' / 'desc' }
    model.headings = headings.reduce((sortState, heading) => {
        sortState[heading] = {
            sortState: undefined,
            label: heading
        };
        return sortState;
    }, {});
    model.reviews = reviewsArr;
}

/** Start render code */
function renderTable() {
    const container = document.querySelector('.container');
    const tblHead = container.querySelector('thead');
    const tblBody = container.querySelector('tbody');
    // Input elements should be created in renderHeadings ...
    renderHeadings(model.headings, tblHead);
    renderRows(model.reviews, tblBody);
}

const renderHeadings = (headings, thead) => {
    thead.innerHTML = '';
    const tr = document.createElement('tr');

    // create headings for each and append
    Object.entries(headings).forEach(([prop, {label, sortState}]) => {

        // create a heading ...
        // create a div element with the text
        const divText = createElem('div', label.replace(/_/g, ' '), null, {
            'data-prop': prop
        });
        // create a div element that contains the input element
        const inputElem = createElem('input', '', null, {
            'data-prop': prop,
            'type': 'text',
            'placeholder': label.replace(/_/g, ' ')
        });
        const divWithInput = createElem('div', null, null, null, [inputElem]);

        // create a th element
        const th = createElem('th', null, null, null, [divWithInput, divText]);
        tr.appendChild(th);
    });

    thead.appendChild(tr);
};

const renderRows = (reviews, tbody) => {
    tbody.innerHTML = '';
    const filteredReviews = filterReviews(reviews, model.headings);

    filteredReviews.forEach(review => {
        const tr = document.createElement('tr');
        // filter all reviews according to the heading file
        Object.values(review).forEach(val => {
            tr.appendChild(createTdElement(val));
        });

        tbody.appendChild(tr);
    });
};

function updateHeadingsWithSortState() {
    const upArrow = '↑';
    const downArrow = '↓';
    const ths = document.querySelectorAll('.container thead th > div:last-child');

    ths.forEach(th => {
        const {prop} = th.dataset;
        if (prop === model.sortProp) {
            const arrow = model.headings[prop].sortState ? upArrow : downArrow;
            th.innerHTML = model.headings[prop].label + `${arrow}`
        } else {
            th.innerHTML = model.headings[prop].label;
        }
    });
}

/** End render code */

/**
 * @desc create an element, given the tagName, className, etc ..
 * @param {String} tagName tag of the element e.g. div, span, section etc
 * @param {String} [innerHTML]
 * @param {String} [className] class of the element
 * @param {Object} [attributes]  An array in the format [{'id': 'myNewElement'}]
 * @param {Array} [children] An array of dom elements to be attached as children to the element
 * @return {Object} HTMLElement
 * */
const createElem = (tagName, innerHTML, className, attributes, children = []) => {
    const elem = document.createElement(tagName);

    className && (elem.classList.add(className));
    innerHTML && (elem.innerHTML = innerHTML);

    attributes && Object.keys(attributes).length &&
    Object.entries(attributes).forEach(([attrName, attrVal]) =>
        elem.setAttribute(attrName, attrVal));
    Array.isArray(children) && children.forEach(child => elem.appendChild(child));

    return elem;
};