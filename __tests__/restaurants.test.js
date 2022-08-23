const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

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

  it('#GET /restaurants should return list of restaurants for any user', async () => {
    const res = await request(app).get('/api/v1/restaurants');
    expect(res.status).toEqual(200);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
    });
  });

  it('#GET /restaurants:id should return a restaurant with all its information', async () => {
    const res = await request(app).get('/api/v1/restaurants/1');
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      type: expect.any(String),
      reviews: [
        {
          id: expect.any(String),
          stars: expect.any(String),
          details: expect.any(String),
        },
      ],
    });
  });

  it('#POST should add a new review if the user is logged in', async () => {
    const newReview = {
      stars: '4',
      details: 'not too shabby',
    };

    const agent = request.agent(app);
    await agent.post('/api/v1/users').send(testUser);

    const res = await agent
      .post('/api/v1/restaurants/1/reviews')
      .send(newReview);
    console.log('res.body', res.body);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      restaurant_id: expect.any(String),
      user_id: expect.any(String),
      ...newReview,
    });

    console.log('res.status', res.status);
  });

  it('#DELETE /api/v1/reviews/:id should delete a review for admin', async () => {
    const agent = request.agent(app);
    await agent.post('/api/v1/users').send({
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin',
      password: 'admin'
    });

    const res = await agent.delete('/api/v1/reviews/1');
    expect(res.status).toBe(200);

    const resp = await agent.get('/api/v1/reviews/1');
    expect(resp.status).toBe(404);
  });

  it('#DELETE /api/v1/reviews/:id should delete a review for user who posted it', async () => {
    const newReview = {
      stars: '4',
      details: 'oop',
    };
    const agent = request.agent(app);
    await agent.post('/api/v1/users').send(testUser);

    const response = await agent
      .post('/api/v1/restaurants/1/reviews')
      .send(newReview);
    expect(response.status).toBe(200);

    const res = await agent.delete('/api/v1/reviews/4');
    expect(res.status).toBe(200);

    const resp = await agent.get('/api/v1/reviews/4');
    expect(resp.status).toBe(404);
  });
});
