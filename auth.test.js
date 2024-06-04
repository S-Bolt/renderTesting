// auth.test.js

const authenticate = require('./auth');

test('authenticate with valid credentials', () => {
  const email = 'test@gmail.com';
  const username = 'testuser';
  const password = 'password';
  
  expect(authenticate(email, username, password)).toBe(true);
});

test('authenticate with invalid credentials', () => {
  const email = 'invalid@gmail.com';
  const username = 'invaliduser';
  const password = 'invalidpassword';
  
  expect(authenticate(email, username, password)).toBe(false);
});
