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

describe('/start', () => {
  before((done) => {
    seed(client)
      .then(() => {
        server.listen(8080, () => done());
      })
      .catch(done);
  });
  after(() => server.close());

  it('must return a 400 when no session is provided', async () => {
    // Given
    const payload = {};

    // When
    const response = await request.post('start', payload);

    // Then
    assert.equal(response.statusCode, 400);
  });

  it('must return a 422 when an invalid session is provided', async () => {
    // Given
    const payload = { session: 'garbage-token' };

    // When
    const response = await request.post('start', payload);

    // Then
    assert.equal(response.statusCode, 400);
  });

  it('must return a 403 when called twice in a row', async () => {
    // Given
    const sessionResponse = await request.post('session');
    const { session } = sessionResponse.body;
    const payload = { session };

    // When
    await request.post('start', payload);
    const response = await request.post('start', payload);

    // Then
    assert.equal(response.statusCode, 403);
  });

  it('must return a 200 with a question and answers property', async () => {
    // Given
    const sessionResponse = await request.post('session');
    const { session } = sessionResponse.body;
    const payload = { session };

    // When
    const response = await request.post('start', payload);

    // Then
    assert.equal(response.statusCode, 200);
    assert.isString(response.body.question);
    assert.isArray(response.body.answers);
  });
});
