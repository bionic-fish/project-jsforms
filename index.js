//display elements 
// displayElements();

// function displayElements() {
//     const elementsBtn = document.querySelector('elementsBtn');
//    elementsBtn.addEventListener('click', function() {
//         const intro = document.querySelector('intro');
//         intro.document.style.display = 'block';
//         console.log(intro);
//     })
// }

// form elements
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const username = document.getElementById('username');
const password = document.getElementById('password');
const confirmpassword = document.getElementById('confirmpassword');
const email = document.getElementById('email');
// form element testing
console.log(firstname);
console.log(lastname);
console.log(username);
console.log(password);
console.log(confirmpassword);
console.log(email);

// form 
const form = document.getElementById('form');
    const green = 'green';
    const red = 'red';

// Handle form
form.addEventListener('submit', function(event) {
    // Prevent default behaviour
    event.preventDefault();
    if (
      validateFirstname() && validateLastname() && validatePassword() && validateConfirmPassword() && validateEmail()
    ) {
        const name = firstname.value;
        const container = document.querySelector('div.placement');
        const loader = document.createElement('div');
        loader.className = 'progress';
        const loadingBar = document.createElement('div');
        loadingBar.className = 'indeterminate';
        loader.appendChild(loadingBar);
        container.appendChild(loader);

        setTimeout(function() {
    
            const loaderDiv = document.querySelector('div.progress');
            const panel = document.createElement('div');
            panel.className = 'card';
            const text = document.createElement('span');
            text.style.margin = 'auto';
            text.style.color = red;
            text.appendChild(
                document.createTextNode(
                `Registration complete! welcome to the platform ${name}!`
                )
            );
            panel.appendChild(text);
            container.replaceChild(panel, loaderDiv);
            }, 1000);
    }
  });



// validation functions
function validateFirstname() {
    // check if empty
    if (checkIfEmpty(firstname)) return;
    // meet required minimum characters
    if (!meetLength(firstname, 3, 12)) return;
    // is if it has only letters
    if (!checkIfOnlyLetters(firstname)) return;
    return true;
}

function validateLastname() {
    // check if empty
    if (checkIfEmpty(lastname)) return;
    // meet required minimum characters
    if (!meetLength(lastname, 2, 12)) return;
    // is if it has only letters
    if (!checkIfOnlyLetters(lastname)) return;
    return true;
}

function validateEmail() {
    // check if empty
    if (checkIfEmpty(email)) return;
    // check if email is valid
    if (!containsCharacters(email, 5)) return;
    return true;
}

function validateUsername() {
    // check if empty
    if (checkIfEmpty(username)) return;
    // check if contains letters & numbers
    if (!containsCharacters(username, 2)) return;
    return true;
}

function validatePassword() {
    // check if empty
    if (checkIfEmpty(password)) return;
    // must be of certain length
    if (!meetLength(password, 3, 20)) return;
    // check if contains uppercase, lowercase & number
    if (!containsCharacters(password, 1)) return;
    return true;
}

function validateConfirmPassword() {
    if (password.className !== 'valid') {
        setInvalid(confirmpassword, 'Password must be valid');
        return;
    }
    // if they match
    if (password.value !== confirmpassword.value) {
        setInvalid(confirmpassword, 'Passwords must match');
        return;
    } else {
        setValid(confirmpassword);
    }
    return true;
}


// invalid user values
function setInvalid(field, message) {
    field.className = 'invalid';
    field.className = 'validationMsg';
    field.nextElementSibling.innerHTML = message;
    field.nextElementSibling.style.color = red;
}
// valid user values
function setValid(field) {
    field.className = 'valid';
    field.nextElementSibling.innerHTML = '';
    field.nextElementSibling.style.color = green;
}

// utility functions

// check if field is empty
function checkIfEmpty(field) {
    if (isEmpty(field.value.trim())) {
        // set field invalid
        setInvalid(field, `${field.name} must not be empty`);
        return true;
    } else {
        // set field valid
        setValid(field);
        return false;
    }
}

// check if input value is empty, otherwise return false
function isEmpty(value) {
    if (value === '') return true;
    return false;
}

// check to see if user only used letters
function checkIfOnlyLetters(field) {
    if (/^[a-zA-Z ]+$/.test(field.value)) {
        setValid(field);
        return true;
    } else {
        setInvalid(field, `${field.name} must contain only letters`)
        return false;
    }
}

function matchWithRegEx(regEx, field, message) {
    if (field.value.match(regEx)) {
        setValid(field);
        return true;
    } else {
        setInvalid(field, message);
        return false;
    }
}

//check the user has met the minimum length of each field input
function meetLength(field, minLength, maxLength) {
    if (field.value.length >= minLength && field.value.length < maxLength) {
        setValid(field);
        return true;
    } else if (field.value.length < minLength) {
        setInvalid(field, `${field.name} must be at least ${minLength} characters`);
        return false;
    } else {
        setInvalid(field, `${field.name} must be shorter than ${maxLength} characters`);
        return false;
    }
}
// character validations
    // 1- a
    // 2- a 1
    // 3- A a 1
    // 4- A a 1 @
    // 5- email @ company .com
function containsCharacters(field, code) {
    let regEx;
    switch(code) {
        case 1 :
            // letters
            regEx = /(?=.*[a-zA-Z])/;
            return matchWithRegEx(regEx, field, 'Must contain at least one letter');
        case 2 :
            // letters and numbers
            regEx = /(?=.*\d)(?=.*[a-zA-Z])/;
            return matchWithRegEx(regEx, field, 'Must contain one letter & one number');
        case 3 :
            // uppcase, lowercase and number
            regEx =  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
            return matchWithRegEx(regEx, field, 'Must contain one uppercase letter, one lowercase & one number');
        case 4 :
            // uppercase, lowercase, number and special char
            regEx = /(?=.*\d)(?=.*[a-z])(?=.[A-Z])(?=.*\W)/;
            return matchWithRegEx(regEx, field, 'Must contain at least one uppercase letter, one lowercase, one number and one special character');
        case 5 :
            regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return matchWithRegEx(regEx, field, 'Must contain a valid email address');
        default :
            // default return
            return false;
    }
}

function matchWithRegEx(regEx, field, message) {
    if (field.value.match(regEx)) {
        setValid(field);
        return true;
    } else {
        setInvalid(field, message);
        return false;
    }
}








    



































    
    
    // user create validation
    
    // var password = document.querySelector("pass");

    // // email validation
    // var email = document.querySelector("email");

    // // user real name
    // var name = document.querySelector("name");
    
    // // address validation
    // var streetNo = document.querySelector("stnum");
    // var streetName = document.querySelector("stname");
    // var city = document.querySelector("city");
    // var postcode = document.querySelector("postcode");

    // // phone validation
    // var mobile = document.querySelector("phone");

    // // submit & validate button
    // var submitBtn = document.querySelector('.submitBtn');






