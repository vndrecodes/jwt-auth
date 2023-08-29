/* eslint-disable require-jsdoc */
function addFormSubmitEventListener() {
  const form = document.getElementById('register-form');
  form.addEventListener('submit', handleFormSubmitEvent);
}


async function handleFormSubmitEvent(event) {
  event.preventDefault();
  let formData = new FormData(event.target);
  formData = JSON.stringify(Object.fromEntries(formData));
  const url = '/signup';
  let success = false;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: formData,
  });

  success = response.ok;
  renderRegistrationStatus(response);
  if (success) {
    replaceSignupFormWithLogin();
  }

  console.log(`register.handleFormSubmitEvent(): ${response}`);
}


async function renderRegistrationStatus(response) {
  const statusSectionEl = document.getElementById('registration-status');
  if (response.ok) {
    statusSectionEl.textContent = 'Registered successfully';
    statusSectionEl.classList.remove('registration-status-failed');
    statusSectionEl.classList.add('registration-status-success');
  } else {
    response = await response.json();
    statusSectionEl.textContent = `Registration failed: ${response.message}`;
    statusSectionEl.classList.add('registration-status-failed');
  }
  statusSectionEl.style.visibility = 'visible';
}


function replaceSignupFormWithLogin() {
  const cardBodyEl = document.getElementsByClassName('card-body')[0];
  const registerForm = document.getElementById('register-form');
  const cardBodyHeader = cardBodyEl.getElementsByTagName('h1')[0];
  const cardBodyText = cardBodyEl.getElementsByTagName('p')[0];
  const signinButton = document.createElement('a');

  registerForm.remove();

  cardBodyHeader.textContent = 'Login now!';
  cardBodyText.textContent = 'Use your credentials to login.';
  signinButton.setAttribute('href', './signin');
  signinButton.textContent = 'Signin';
  signinButton.classList.add('button');
  signinButton.classList.add('button-primary');


  cardBodyEl.appendChild(signinButton);
}

addFormSubmitEventListener();

