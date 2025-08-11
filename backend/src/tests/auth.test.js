const request = require('supertest');
const app = require('../app');

describe('Auth Routes', () => {
  const userData = {
    username: 'dinithi',
    password: 'Password123!',
  };

  let token;

  test('Register - POST /api/auth/register', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(userData);

    console.log('Register response:', res.statusCode, res.body);

    if (res.statusCode === 400 && res.body.error === 'username exists') {
      // User already exists, this is fine for tests if DB is not reset
      expect(res.body.error).toBe('username exists');
    } else {
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
    }
  });

  test('Login - POST /api/auth/login', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send(userData);

    console.log('Login response:', res.statusCode, res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  test('Get Current User - GET /api/auth/me', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`);

    console.log('Get current user response:', res.statusCode, res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('username', userData.username);
  });
});
