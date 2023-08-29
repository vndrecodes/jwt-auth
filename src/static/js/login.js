/* eslint-disable require-jsdoc */
function addFormSubmitEventListener() {
  const form = document.getElementById('login-form');
  form.addEventListener('submit', handleLoginFormSubmitEvent);
}


async function handleLoginFormSubmitEvent(event) {
  event.preventDefault();
  let formData = new FormData(event.target);
  formData = JSON.stringify(Object.fromEntries(formData));
  const url = '/signin';
  let success = false;
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: formData,
  });

  success = response.ok;
  const responseMessage = await response.json();

  if (!success) {
    renderLoginError(responseMessage.message);
    return;
  }

  const userId = responseMessage.user.id;
  document.cookie = `userId=${userId}`;

  window.location.replace('/dashboard');
}


async function renderLoginError(message) {
  const statusSectionEl = document.getElementById('login-status');
  statusSectionEl.textContent = `${message}`;
  statusSectionEl.classList.add('login-status-failed');
  statusSectionEl.style.visibility = 'visible';
}


addFormSubmitEventListener();
