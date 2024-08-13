var r = require('rethinkdbdash')({
    servers: [{
        host: 'localhost',
        port: 28015,
    }]
});

module.exports = {r};