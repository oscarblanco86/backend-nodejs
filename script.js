// script.js

const API_BASE_URL = 'http://localhost:3000/api/v1/users/'; // Replace with your API base URL

async function createUser() {
  const email = document.getElementById('user-email').value;
  const password = document.getElementById('user-password').value;

  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  displayOutput('User Created:', data);
}

async function createCustomer() {
  const name = document.getElementById('customer-name').value;
  const lastName = document.getElementById('customer-lastname').value;
  const phone = document.getElementById('customer-phone').value;
  const userId = document.getElementById('customer-user-id').value;

  const response = await fetch(`${API_BASE_URL}/customers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, lastName, phone, userId }),
  });

  const data = await response.json();
  displayOutput('Customer Created:', data);
}

function displayOutput(message, data) {
  const output = document.getElementById('output');
  output.innerHTML = `<h3>${message}</h3><pre>${JSON.stringify(data, null, 2)}</pre>`;
}
