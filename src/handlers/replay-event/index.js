
exports.handler = async (event, ctx, callback) => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            msg: 'You provided this event',
            event
        })
    }
};
