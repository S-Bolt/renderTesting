function authenticate(email, username, password) {
  if (email === 'test@gmail.com' && username === 'testuser' && password === 'password') {
      return true;
  } else {
      return false;
  }
}
module.exports = authenticate;
