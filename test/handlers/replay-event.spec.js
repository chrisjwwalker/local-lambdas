
const assert = require('assert');

const testhandler = require('../../src/handlers/replay-event');

describe('replay-event', () => {
    it('should return the passed event in a wrapper', async () => {
        const testEvent = {
            message: 'Testing lambdas locally'
        }

        const expected = {
            statusCode: 200,
            body: JSON.stringify({
                msg: 'You provided this event',
                event: {
                    message: 'Testing lambdas locally'
                }
            })
        }

        const result = await testhandler.handler(testEvent, {}, {})
        assert.deepEqual(result, expected)
    });
});
