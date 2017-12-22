const { assert } = require('chai');
const server = require('../../lib/server');
const request = require('request-promise').defaults({
  baseUrl: 'http://localhost:8080/api/',
  json: true,
  resolveWithFullResponse: true,
  simple: false,
});

describe('/next', () => {
  before(done => server.listen(8080, () => done()));
  after(() => server.close());

  it('must return 400 if no GUID is provided', async (done) => {
    try {
      // Given
      const payload = {};

      // When
      const nextResponse = await request.post('next', payload);

      // Then
      assert.equal(nextResponse.statusCode, 400);
      done();
    } catch (error) {
      done(error);
    }
  });

  it('must return 422 if a bad session is provided', async (done) => {
    try {
      // Given
      const payload = { session: 'garbage-token' };

      // When
      const nextResponse = await request.post('next', payload);

      // Then
      assert.equal(nextResponse.statusCode, 422);
      done();
    } catch (error) {
      done(error);
    }
  });

  it('must return 403 if called before start is called', async (done) => {
    try {
      // Given
      const sessionResponse = await request.post('session');
      const { session } = sessionResponse.body;

      // When
      const nextResponse = await request.post('next', { session });

      // Then
      assert.equal(nextResponse.statusCode, 403);
      done();
    } catch (error) {
      done(error);
    }
  });

  it('must return 200 with a question and answers field with proper request', async (done) => {
    try {
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
      done();
    } catch (error) {
      done(error);
    }
  });
});
