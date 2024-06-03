const request = require('supertest');
const express = require('express');
const session = require('express-session');
const { sequelize, User } = require('../../models');
const userRoutes = require('../../controllers/api/user-routes');
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
app.use('/api/users', userRoutes);

describe('User Routes', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  afterEach(async () => {
    await User.destroy({ where: {} });
  });
});

//Testing
describe('POST /api/users', () => {
    it('Should create new user', async () =>{
        const res = await request(app)
        .post('/api/users')
        .send({
            email: 'test@testmail.com',
            username: 'testuser',
            password: 'password123'
        });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('email', 'test@testmail.com');
        expect(res.body).toHaveProperty('username', 'testuser');
});
    it('Should fail if missing email value', async () => {
        const res = await request(app)
        .post('/api/users')
        .send({
            username: 'testuser',
            password: 'password123'
        });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message', 'Email, username, and password are required.')
    });

    it('Should fail if missing username value', async () => {
      const res = await request(app)
      .post('/api/users')
      .send({
        email: 'test@testmail.com',
        password: 'password123'
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Email, username, and password are required.');
    });

    it('Should fail is missing password value', async () => {
      const res = await request(app)
      .post('/api/users')
      .send({
        email: 'test@testmail.com',
        username: 'testuser',
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Email, username, and password are required.');
    })
});