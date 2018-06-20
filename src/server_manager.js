// Example business logic
var mdl = require( './model')

// Retrieves server inventory
function getServers(cb) {
    mdl.getServers(function(err, servers) {
        cb(err, {"sm_version": "v1", "servers": servers })
    })
}

// Adds a server to server inventory
function addServer(server, cb){
    mdl.createServer(server, cb)
}

function clearServers() {
    return mdl.clearServers()
}

module.exports = {
    clearServers: clearServers,
    addServer: addServer,
    getServers: getServers,
    init: function(){ mdl.initDB()}
}