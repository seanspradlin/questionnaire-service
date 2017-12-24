process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const Server = require('../../lib/server');
const redis = require('redis-mock');
const request = require('request-promise').defaults({
  baseUrl: 'http://localhost:8080/api/',
  json: true,
  resolveWithFullResponse: true,
  simple: false,
});

const client = redis.createClient();
const server = new Server(client);

describe('/next', () => {
  before(done => server.listen(8080, () => done()));
  after(() => server.close());

  it('must return 400 if no GUID is provided', async () => {
    // Given
    const payload = {};

    // When
    const nextResponse = await request.post('next', payload);

    // Then
    assert.equal(nextResponse.statusCode, 400);
  });

  it('must return 422 if a bad session is provided', async () => {
    // Given
    const payload = { session: 'garbage-token' };

    // When
    const nextResponse = await request.post('next', payload);

    // Then
    assert.equal(nextResponse.statusCode, 422);
  });

  it('must return 403 if called before start is called', async () => {
    // Given
    const sessionResponse = await request.post('session');
    const { session } = sessionResponse.body;

    // When
    const nextResponse = await request.post('next', { session });

    // Then
    assert.equal(nextResponse.statusCode, 403);
  });

  it('must return 200 with a question and answers field with proper request', async () => {
    // Given
    const sessionResponse = await request.post('session');
    const { session } = sessionResponse.body;

    // When
    await request.post('start', { session });
    const nextResponse = await request.post('next', { session });

    // Then
    assert.equal(nextResponse.statusCode, 200);
    assert.isString(nextResponse.body.question);
    assert.isArray(nextResponse.body.answers);
  });
});
