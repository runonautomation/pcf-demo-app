var express = require('express');
var app = express();

// Initialize CloudFoundry Integration
var cf_app = require( './vcap')
var serverManager = require( './server_manager')
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Index page
app.use('/', express.static('static'))

// List servers in the datacenter CMDB
app.get('/servers', function(req, res) {
    serverManager.getServers(function(err, serversResponse) {
        res.status(200).json(serversResponse);
    })
});

// Add a server to the datacenter CMDB
app.post('/servers', function(req, res) {
    serverManager.addServer(req.body, function(err, serversResponse) {
        res.status(200).json(serversResponse);
    })
});

app.get('/clear', function(req, res) {
    res.status(200).json(serverManager.clearServers());
});

serverManager.init()

/// Listen on 8080
app.listen(8080, function () {
    console.log('listening on port', 8080);
});