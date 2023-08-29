/* eslint-disable require-jsdoc */
async function fetchUserData() {
  const cookies = parseCookies();
  const userId = cookies.userId;
  const url = `/users/${userId}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const responseMsg = await response.json();
  // TODO Wip
  const username = responseMsg.user.name;
  const email = responseMsg.user.email;
  
}


function parseCookies() {
  const cookiesArr = document.cookie.split(';');
  const cookiesObj = {};
  cookiesArr.forEach((i) => {
    const keyVal = i.split('=');
    const key = keyVal[0].trim();
    const val = keyVal[1];
    cookiesObj[key] = val;
  });
  return cookiesObj;
}


function renderUserDetails(username, email) {
  const userDetailsTable = document.getElementById('user-details');
}

fetchUserData();