// user-routes.test.js

const request = require('supertest');
const express = require('express');
const router = require('./controllers/api/user-routes');
const { User, UserProblem } = require("../../models"); 
const withAuth = require("../../public/utils/auth.js"); // Import the models
const bcrypt = require('bcrypt');

// Mock the dependencies
jest.mock('././models/User');
jest.mock('././models/UserProblem');
jest.mock('bcrypt');

const app = express();
app.use(express.json());
app.use('/', router);

describe('User Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('POST /api/users creates a new user', async () => {
    const reqBody = { email: 'test@example.com', username: 'testuser', password: 'password' };
    const newUser = { id: 1, ...reqBody };

    User.create.mockResolvedValueOnce(newUser);

    const response = await request(app)
      .post('/api/users')
      .send(reqBody);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(newUser);
  });

  test('POST /api/users/login logs in a user', async () => {
    const reqBody = { username: 'testuser', password: 'password' };
    const existingUser = { id: 1, ...reqBody, password: 'hashedPassword' };

    User.findOne.mockResolvedValueOnce(existingUser);
    bcrypt.compare.mockResolvedValueOnce(true);

    const response = await request(app)
      .post('/api/users/login')
      .send(reqBody);

    expect(response.statusCode).toBe(200);
    expect(response.body.user).toEqual(existingUser);
    expect(response.body.message).toBe('You are now logged in!');
  });

  // Add more test cases for other routes if needed
});
