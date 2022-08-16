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

    expect(res.body[0]).toBe({
      id: expect.any(String),
      name: expect.any(String),
      type: expect.any(String),
    });
  });
});
