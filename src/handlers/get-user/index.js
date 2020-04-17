
const userService = require('../../services/user-service');

exports.handler = async (req, event) => {
    if(req.queryStringParameters == null) return { statusCode: 500, body: JSON.stringify({ error: 'No Id param supplied' }) }

    const user = userService.getUser(parseInt(req.queryStringParameters.id));

    return {
        statusCode: 200,
        body: JSON.stringify(user)
    }
}
