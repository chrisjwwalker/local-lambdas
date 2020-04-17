
const user = {
    id: 1,
    name: 'John Smith',
    email: 'js@local-lambdas.com',
}

const notFound = id => {
    return {
        error: `Cannot find user against Id ${id}`
    }
}

const getUser = id => {
    return id === 1 ? user : notFound(id);
}

module.exports = {
    getUser
}
