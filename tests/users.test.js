const request = require('supertest');
const app = require('../src/app');

describe('User API', () => {
  test('GET /api/users returns all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('GET /api/users/:id returns a single user', async () => {
    const res = await request(app).get('/api/users/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name');
  });

  test('GET /api/users/:id returns 404 for missing user', async () => {
    const res = await request(app).get('/api/users/999');
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('User not found');
  });

  test('POST /api/users creates a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Test User' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test User');
  });

  test('GET / returns running message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Server is running');
  });
});
