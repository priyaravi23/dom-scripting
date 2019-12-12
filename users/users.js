let users = [];

document.addEventListener('readystatechange', function () {
    if (document.readyState === 'interactive') {
        init();
    }
});

function init() {
    let inputs = document.querySelectorAll('.create-user input');
    let button = document.querySelector('button');
    let contentHeader = document.querySelectorAll('th');

    button.addEventListener('click', () => {
        let user = {
            firstName: inputs[0].value,
            lastName: inputs[1].value,
            dob: inputs[2].value
        };
        users.push(user);
        renderUsers(users);
    });

    contentHeader.forEach(item => {
        item.addEventListener('click', () => {
            return sortBy(compareFn.bind(null, item));
        })
    })
}

function sortBy(users, prop) {
    let sortedUsers = [...users];

    sortedUsers.forEach(user => {
        return user.sort(compareFn);
    });

    return sortedUsers;
}

function compareFn(prop, a, b) {
    if (a[prop] > b[prop]) return 1;
    else if (a[prop] < b[prop]) return -1;
    else return 0;
}

function renderUsers(users) {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    users.forEach(user => tbody.appendChild(createTrElement(user)))
}

function createTrElement(user) {
    const tr = document.createElement('tr');

    Object.values(user).forEach(val => {
      const td = document.createElement('td');
      td.innerHTML = val;
      tr.appendChild(td);
    });

    return tr;
}
