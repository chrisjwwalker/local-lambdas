
const assert = require('assert');

const testHandler = require('../../src/handlers/get-user');

describe('get-user', () => {
    it('should return a user', async () => {
        const fakeRequest = {
            queryStringParameters: {
                id: 1
            }
        }

        const expected = {
            statusCode: 200,
            body: JSON.stringify({
                id: 1,
                name: 'John Smith',
                email: 'js@local-lambdas.com',
            })
        }

        const result = await testHandler.handler(fakeRequest, {})
        assert.deepEqual(result, expected)
    });

    it('should return a not found', async () => {
        const fakeRequest = {
            queryStringParameters: {
                id: 2
            }
        }

        const expected = {
            statusCode: 200,
            body: JSON.stringify({ error: `Cannot find user against Id 2`})
        }

        const result = await testHandler.handler(fakeRequest, {})
        assert.deepEqual(result, expected)
    });

    it('should return an error when no query params are given', async () => {
        const fakeRequest = {
        }

        const expected = {
            statusCode: 500,
            body: JSON.stringify({ error: 'No Id param supplied'})
        }

        const result = await testHandler.handler(fakeRequest, {})
        assert.deepEqual(result, expected)
    });
});
