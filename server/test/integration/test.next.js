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

describe('/next', () => {
  before((done) => {
    seed(client)
      .then(() => {
        server.listen(8080, () => done());
      })
      .catch(done);
  });
  after(() => server.close());

  it('must return 400 if no GUID is provided', async () => {
    // Given
    const payload = { body: { answer: 0 } };

    // When
    const nextResponse = await request.post('next', payload);

    // Then
    assert.equal(nextResponse.statusCode, 400);
  });

  it('must return 400 if no answer is provided', async () => {
    // Given
    const sessionResponse = await request.post('session');
    const { session } = sessionResponse.body;
    const payload = { body: { session } };

    // When
    await request.post('start', payload);
    const nextResponse = await request.post('next', payload);

    // Then
    assert.equal(nextResponse.statusCode, 400);
  });

  it('must return 422 if answer is not a number', async () => {
    // Given
    const sessionResponse = await request.post('session');
    const { session } = sessionResponse.body;
    const payload = { body: { session, answer: 'hello' } };

    // When
    await request.post('start', payload);
    const nextResponse = await request.post('next', payload);

    // Then
    assert.equal(nextResponse.statusCode, 422);
  });

  it('must return 422 if answer is out of range of possible answers', async () => {
    // Given
    const sessionResponse = await request.post('session');
    const { session } = sessionResponse.body;
    const startPayload = { body: { session } };

    // When
    const startResponse = await request.post('start', startPayload);
    const nextPayload = { body: { session, answer: startResponse.body.answers.length + 1 } };
    const nextResponse = await request.post('next', nextPayload);

    // Then
    assert.equal(nextResponse.statusCode, 422);
  });

  it('must return 422 if a bad session is provided', async () => {
    // Given
    const payload = { body: { session: 'garbage-token' } };

    // When
    const nextResponse = await request.post('next', payload);

    // Then
    assert.equal(nextResponse.statusCode, 422);
  });

  it('must return 403 if called before start is called', async () => {
    // Given
    const sessionResponse = await request.post('session');
    const { session } = sessionResponse.body;
    const payload = { body: { session, answer: 0 } };

    // When
    const nextResponse = await request.post('next', payload);

    // Then
    assert.equal(nextResponse.statusCode, 403);
  });

  it('must return 200 with a question and answers field with proper request', async () => {
    // Given
    const sessionResponse = await request.post('session');
    const { session } = sessionResponse.body;
    const payload = { body: { session, answer: 0 } };

    // When
    await request.post('start', payload);
    const nextResponse = await request.post('next', payload);

    // Then
    assert.equal(nextResponse.statusCode, 200);
    assert.isString(nextResponse.body.question);
    assert.isArray(nextResponse.body.answers);
  });
});
