process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const server = require('../../lib/server');
const request = require('request-promise').defaults({
  baseUrl: 'http://localhost:8080/api/',
  json: true,
  resolveWithFullResponse: true,
  simple: false,
});

describe('/summary', () => {
  before(done => server.listen(8080, () => done()));
  after(() => server.close());

  it('must return a 400 when no session is provided', async (done) => {
    try {
      // When
      const response = await request('summary');

      // Then
      assert.equal(response.statusCode, 400);
      done();
    } catch (error) {
      done(error);
    }
  });

  it('must return a 422 when an invalid session is provided', async (done) => {
    try {
      // When
      const response = await request('summary?session=garbage-token');

      // Then
      assert.equal(response.statusCode, 422);
      done();
    } catch (error) {
      done(error);
    }
  });

  it('must return a 403 when start has not yet been called', async (done) => {
    try {
      // Given
      const sessionResponse = await request.post('session');
      const { session } = sessionResponse.body;

      // When
      const response = await request(`summary?session=${session}`);

      // Then
      assert.equal(response.statusCode, 403);
      done();
    } catch (error) {
      done(error);
    }
  });

  it('must return a 200 with an array response', async (done) => {
    try {
      // Given
      const sessionResponse = await request.post('session');
      const { session } = sessionResponse.body;
      const payload = { session };
      await request.post('start', payload);

      // When
      const response = await request(`summary?session=${session}`);

      // Then
      assert.equal(response.statusCode, 200);
      assert.isArray(response.body);
      done();
    } catch (error) {
      done(error);
    }
  });
});
