// Questions Array
const questions = [
    { question: 'Enter your First Name'},
    { question: 'Enter your Last Name'},
    { question: 'Enter your Email', pattern: /\S+@\S+\.\S+/},
    { question: 'Create A password', type: 'password'}
];

const shakeTime = 100; // Shake trans time
const switchTime = 200; // Transition Between Questions

// Init Position At First Question
let position = 0;

// Init DOM Elements
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');

// Events
// get question on DOM load
document.addEventListener('DOMContentLoaded', getQuestion);

// Next button click
nextBtn.addEventListener('click', validate);

// Input field enter click
inputField.addEventListener('keyup', e=> {
    if(e.keyCode ==13) {
        validate();
    }
});

// Functions

function getQuestion() {
    // Get current question
    inputLabel.innerHTML = questions[position].question;
    // Get Current Type
    inputField.type = questions[position].type || 'text';
    // Get Current Answer
    inputField.value = questions[position].answer || '';
    // Focus on element
    inputField.focus();

    // Set progress bar width - variable to the questions length
    progress.style.width = (position * 100) / questions.length + '%';

    // Add User Icon OR Back Arrow Depending on Question
    prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';

    showQuestion();
}

// Display Question to user
function showQuestion() {
    inputGroup.style.opacity = 1;
    inputProgress.style.transition = '';
    inputProgress.style.width = '100';
}

// Hide Question from user
function hideQuestion() {
    inputGroup.style.opacity = 0;
    inputLabel.style.marginLeft = 0;
    inputProgress.style.width = 0;
    inputProgress.style.transition = 'none';
    inputGroup.style.border = null;
}

// Transform to create shake motion
function transform(x, y) {
    formBox.style.transform = `translate(${x}px, ${y}px)`;
}

// Validate field
function validate() {
    // Make sure pattern matches if there is one
    if(!inputField.value.match(questions[position].pattern || /.+/)) {
        inputFail();
    } else {
        inputPass();
    }
}

// Field Input Fail
function inputFail() {
    formBox.className = 'error';
    // Repeat Shake motion - set i to the number of shakes
    for (let i=0; i<=6; i++) {
        setTimeout(transform, shakeTime * i, ((i % 2) * 2 -1)*20, 0);
        setTimeout(transform, shakeTime * 6, 0, 0);
        inputField.focus();
    }
}

// Field Input Passes
function inputPass() {
    formBox.className = '';
    setTimeout(transform, shakeTime * 0, 0, 10);
    setTimeout(transform, shakeTime * 1, 0, 0);

    // Store answer in array
    questions[position].answer = inputField.value;

    // Increment the position
    position++;

    // If new question, hide current and get next
    if(questions[position]) {
        hideQuestion();
        getQuestion();
    } else {
        // Remove If No More Questions
        hideQuestion();
        formBox.className = 'close';
        progress.style.width = '100%';

        // Form complete
        formComplete();
    }
}

// All fields complete - show g1 end
function formComplete() {
    console.log(questions);
    const h1 = document.createElement('h1');
    h1.classList.add('end');
    h1.appendChild(
        document.createTextNode(
            `Thanks ${
                questions[0].answer
            } You are registered and will get an email shortly`
        )
    );
    setTimeout(()=> {
        formBox.parentElement.appendChild(h1);
        setTimeout(()=> h1.style.opacity = 50);
    }, 1000);
}