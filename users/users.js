let users = [];
const props = ['firstName', 'lastName', 'dateOfBirth'];
const sortStates = {
  firstName: undefined,
  lastName: undefined,
  dateOfBirth: undefined
};

document.addEventListener('readystatechange', function () {
  if (document.readyState === 'interactive') {
    init();
  }
});

function init() {
  let inputs = document.querySelectorAll('.create-user input');
  let button = document.querySelector('.create-user button');
  // querySelectorAll returns a NodeList[] NOT an ARRAY
  let listHeaders = Array.from(document.querySelectorAll('.list-users th'));


  button.addEventListener('click', () => {
    let user = {
      firstName: inputs[0].value,
      lastName: inputs[1].value,
      dob: inputs[2].value
    };
    users.push(user);
    renderUsers(users);
  });


  listHeaders.forEach((th, index) => {
    const prop = props[index];
    const sortState = sortStates[prop];
    console.log(prop, th, sortState);

    const thClickHandler = () => {
        // console.log('clicked');
        const newSortState = !sortStates[prop];
        sortStates[prop] = newSortState;
        const newUsersArr = sortBy(users, prop, newSortState);
        renderUsers(newUsersArr);
        th.querySelector('span').innerHTML = newSortState ? '(asc)' : '(desc)';
    };

    th.addEventListener('click', thClickHandler);
  });
}

function sortBy(users, prop, asc) {
  let sortedUsers = [...users];

  // sort fn
  if (asc) {
    sortedUsers.sort(compareFnAsc.bind(null, prop));
  } else {
    sortedUsers.sort(compareFnDesc.bind(null, prop));
  }
  // bind creates a new function with the context and params bound to the function
  // context -> null
  // prop -> prop
  // You have not bound a and b
  // New function can take in two params a, b

  return sortedUsers;
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
