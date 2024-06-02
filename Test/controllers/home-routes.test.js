const request = require('supertest');
const express = require('express');
const session = require('express-session');
const { sequelize, User, Problem } = require('../../models');
const homeRoutes = require('../../controllers/home-routes');
const { describe } = require('../../models/User');

//Setting up Express and middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'test secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);
app.use('/', homeRoutes);

describe('Home Routes', () => {
    beforeAll(async () => {
      await sequelize.sync({ force: true });
    });
  
    afterAll(async () => {
      await sequelize.close();
    });
});

//Testing
describe('GET /', ()  => {
  it('Should return the homepage with problem', async () => {
    //Create mock data
    await User.create({ username: "testuser", email: "test@testmail.com", password: 'password123'});
    await Problem.create({ title: 'Test Problem', difficulty: 'Easy', user_id: 1});

    const res = await request(app).get('/');

    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Test Problem');
    expect(res.text).toContain('testuser')
  });
});

describe('GET /problems/:id', () => {
  it('should return a signle problem by Id', async () => {
    const validProblemId = 1;

    const res = await request(app).get(`/problems/${validProblemId}`);

    expect(res.statusCode).toEqual(200);
  });

  it('should respond with status 404 for an invalid problem id', async () => {
    const invalidProblemId = 999;

    const res = await request(app).get(`/problems/${invalidProblemId}`);
    
    expect(res.statusCode).toEqual(404);
  });
  })

