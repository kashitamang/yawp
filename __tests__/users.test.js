const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

//dummy user for testing purposes
const testUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@test.com',
  password: 'testing',
};

describe('yawp routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('#POST creates a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(testUser);
    const { firstName, lastName, email } = testUser;
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      message: 'Sign in successful',
      user: {
        id: expect.any(String),
        firstName,
        lastName,
        email,
      },
    });
  });

  it('#POST signs in an existing user', async () => {
    await request(app).post('/api/v1/users').send(testUser);
    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send({ email: 'test@test.com', password: 'testing' });
    expect(res.status).toEqual(200);
  });

  it('#DELETE signs out a user', async () => {
    await request(app).post('/api/v1/users').send(testUser);
    await request(app).post('/api/v1/users/sessions').send(testUser);
    const res = await request(app).delete('/api/v1/users/sessions');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true,
      message: 'Signed out successfully'
    });
  });

});
