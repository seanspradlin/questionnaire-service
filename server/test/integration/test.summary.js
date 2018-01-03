process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const Server = require('../../lib/server');
const redis = require('redis-mock');
const seed = require('../../seed');
const request = require('request-promise').defaults({
  baseUrl: 'http://localhost:8080/api/',
  json: true,
  resolveWithFullResponse: true,
  simple: false,
});

const client = redis.createClient();
const server = new Server(client);

describe('/summary', () => {
  before((done) => {
    seed(client)
      .then(() => {
        server.listen(8080, () => done());
      })
      .catch(done);
  });
  after(() => server.close());

  it('must return a 400 when no session is provided', async () => {
    // When
    const response = await request('summary');

    // Then
    assert.equal(response.statusCode, 400);
  });

  it('must return a 422 when an invalid session is provided', async () => {
    // When
    const response = await request('summary?session=garbage-token');

    // Then
    assert.equal(response.statusCode, 422);
  });

  it('must return a 403 when start has not yet been called', async () => {
    // Given
    const sessionResponse = await request.post('session');
    const { session } = sessionResponse.body;

    // When
    const response = await request(`summary?session=${session}`);

    // Then
    assert.equal(response.statusCode, 403);
  });

  it('must return a 200 with an array response', async () => {
    // Given
    const sessionResponse = await request.post('session');
    const { session } = sessionResponse.body;
    const payload1 = { body: { session } };
    const startResponse = await request.post('start', payload1);
    const payload2 = {
      body: {
        session,
        answer: Math.floor(Math.random() * startResponse.body.answers.length),
      },
    };
    const nextResponse = await request.post('next', payload2);

    // When
    const response = await request(`summary?session=${session}`);

    // Then
    assert.equal(response.statusCode, 200);
    assert.equal(response.body[0].selected, payload2.body.answer);
    assert.isUndefined(response.body[1].selected);
    assert.isArray(response.body);
  });
});
