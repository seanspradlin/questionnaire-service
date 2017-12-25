# Questionnaire Service

## Installation

A docker-compose file is provided. Simply install docker and docker-compose, then run `docker-compose up` to spin up nginx, redis, and the server.

To run without docker-compose, you can stand up your own Redis server and provide values for PORT and REDIS environmental variables. The default redis value is //localhost:6379.

Once running, just open your browser and go to localhost. docker-compose will direct it to port 80, but running the node script itself is port 8080. **NOTE: apidoc.json assumes you're using port 80. The default URLs in the documentation will be pointing to the wrong port if you don't update it to match yours, so it will always result in an error response.**

## Testing

```
cd server
npm test
```

## Notes

You will probably notice that the unit tests are using async/await and the rest are using Promises. I was experimenting with the readability of async/await with the tests, but bluebird is still faster than native promises, so they are used in actual server code.
