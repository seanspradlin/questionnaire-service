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

describe('/session', () => {
  before((done) => {
    seed(client)
      .then(() => {
        server.listen(8080, () => done());
      })
      .catch(done);
  });
  after(() => server.close());

  it('must return a valid UUID', async () => {
    const response = await request.post('session');
    assert.equal(200, response.statusCode);

    const { session } = response.body;
    const uuidTest = /([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}){1}/i;

    assert.isTrue(uuidTest.test(session));
  });
});
