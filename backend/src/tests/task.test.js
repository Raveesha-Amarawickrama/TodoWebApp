const request = require('supertest');
const app = require('../app');

describe('Task Routes', () => {
  let token;
  let createdTaskId;

  const userData = {
    username: 'dinithi',
    password: 'Password123!',
  };

  beforeAll(async () => {
    // Register user first (ignore if exists)
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send(userData);

    if (registerRes.statusCode !== 200 && registerRes.body.error !== 'username exists') {
      throw new Error(`Register failed: ${JSON.stringify(registerRes.body)}`);
    }

    // Login and get token
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send(userData);

    if (loginRes.statusCode !== 200) {
      throw new Error(`Login failed: ${JSON.stringify(loginRes.body)}`);
    }

    token = loginRes.body.token;
  });

  test('Create Task - POST /api/tasks', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Task',
        description: 'This is a test task',
      });

    console.log('Create Task response:', res.statusCode, res.body);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('title', 'Test Task');
    createdTaskId = res.body.id || res.body._id;
  });

  test('Get Tasks - GET /api/tasks', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);

    console.log('Get Tasks response:', res.statusCode, res.body);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('Update Task - PUT /api/tasks/:id', async () => {
    const res = await request(app)
      .put(`/api/tasks/${createdTaskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Task Title' });

    console.log('Update Task response:', res.statusCode, res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('title', 'Updated Task Title');
  });

  test('Delete Task - DELETE /api/tasks/:id', async () => {
    const res = await request(app)
      .delete(`/api/tasks/${createdTaskId}`)
      .set('Authorization', `Bearer ${token}`);

    console.log('Delete Task response:', res.statusCode, res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
  });
});
