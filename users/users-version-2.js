
// render the view when the model changes
// Observer pattern to update the view
// This is internal to react.
const usersHandler = {
    get: function (obj, prop) {
        console.log('You are trying to access the ', prop, 'on the object', obj);
        return obj[prop];
    },
    set: function (obj, prop, newValue) {
        console.log('You are trying to set the ', prop, 'on the object', obj, 'to the new value', newValue);
        obj[prop] = newValue;
        renderUsers();
        console.log('Fire the renderUsers again');
        return true;
    }
};

// create model (Redux lives here)
const model = {
    props: {
        firstName: {
            selector: 'input.first-name',
            sortState: undefined // asc or desc
        },
        lastName: {
            selector: 'input.last-name',
            sortState: undefined // asc or desc
        },
        dateOfBirth: {
            selector: 'input.date-of-birth',
            sortState: undefined // asc or desc
        }
    },
    createButton: {
        selector: '.create-user button'
    },
    users: new Proxy({}, usersHandler)
};


// create controller data (Components, API calls, connectors etc)
const createUserControllerInit = () => {
    const button = document.querySelector(model.createButton.selector);
    const props = Object.keys(model.props); // ['firstName', 'lastName', 'dateOfBirth']
    const inputElements = props
        .map(propName => document.querySelector(model.props[propName].selector));
    console.log(inputElements);
    button.addEventListener('click', () => {
        const user = props.reduce((obj, propName, index) => {
            obj[propName] = inputElements[index].value;
            return obj;
        }, {});
        // use a validator or apply the right attributes to the input element
        if (user.firstName.length && user.dateOfBirth.length) {
            // generate a uuid for the user
            model.users[user.firstName] = user;
            // users.brianna = { firstName: 'brianna' }
            console.log('Updated the users array: ', model.users);
        }
    });
};
const sortUsersControllerInit = () => {};
const initController = () => {
    // Creating a user
    createUserControllerInit();
    // Sorting users
    sortUsersControllerInit();
};

document.addEventListener('readystatechange', () => {
    if(document.readyState === 'interactive') {
        initController();
    }
});

// View Code (React lives here)
function renderUsers() {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    const props = Object.keys(model.props); // ['firstName', 'lastName', 'dateOfBirth']
    Object.values(model.users).forEach(user => {
        const tr = document.createElement('tr');
        props.forEach(prop => {
            const td = document.createElement('td');
            td.innerHTML = user[prop];
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}