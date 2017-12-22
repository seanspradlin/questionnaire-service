const { assert } = require('chai');
const server = require('../../lib/server');
const request = require('request-promise').defaults({
  baseUrl: 'http://localhost:8080/api/',
  json: true,
  resolveWithFullResponse: true,
  simple: false,
});

describe('/start', () => {
  before(done => server.listen(8080, () => done()));
  after(() => server.close());

  it('must return a 400 when no session is provided', async (done) => {
    try {
      // Given
      const payload = {};

      // When
      const response = await request.post('start', payload);

      // Then
      assert.equal(response.statusCode, 400);
      done();
    } catch (error) {
      done(error);
    }
  });

  it('must return a 422 when an invalid session is provided', async (done) => {
    try {
      // Given
      const payload = { session: 'garbage-token' };

      // When
      const response = await request.post('start', payload);

      // Then
      assert.equal(response.statusCode, 400);
      done();
    } catch (error) {
      done(error);
    }
  });

  it('must return a 403 when called twice in a row', async (done) => {
    try {
      // Given
      const sessionResponse = await request.post('session');
      const { session } = sessionResponse.body;
      const payload = { session };

      // When
      await request.post('start', payload);
      const response = await request.post('start', payload);

      // Then
      assert.equal(response.statusCode, 403);
      done();
    } catch (error) {
      done(error);
    }
  });

  it('must return a 200 with a question and answers property', async (done) => {
    try {
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
      done();
    } catch (error) {
      done(error);
    }
  });
});
