var cf_app = require( './vcap')
var dbConn = require( './db')

var connection = dbConn.dbConnection(cf_app.getDbCredentials());
connection.connect();

function getServerEntry(tableRow) {
    var ret = {
        'id': tableRow.id,
        'vendor': tableRow.vendor,
        'sn': tableRow.sn,
        'rack': tableRow.rack
    }
    console.log(ret)
    return ret
}

function getServers(cb) {
    var serverList = [];
    connection.query('SELECT * FROM servers', function(err, rows, fields) {
        if (err) {
            console.error(err)
            res.status(500).json({"status_code": 500,"status_message": "internal server error"});
            return
        }
        for (var i = 0; i < rows.length; i++) {
            var server = getServerEntry(rows[i])
            serverList.push(server);
        }
        cb(null, serverList)
    });
   
}

function createServer(server, cb) {
    var sql = "INSERT INTO servers (vendor, sn, rack) VALUES ?";
    var values = [[server.vendor, server.sn, server.rack]]
    connection.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        cb(null, server) 
    });
}


function clearServers() {
    var sql = "TRUNCATE TABLE servers";
    connection.query(sql, function (err, result) {
        if (err) throw err;
    });
}

function initDB(){
    var connection = dbConn.dbConnection(cf_app.getDbCredentials());
    connection.connect();
    connection.query('CREATE TABLE IF NOT EXISTS servers('
        + 'id INT NOT NULL AUTO_INCREMENT,'
        + 'PRIMARY KEY(id),'
        + 'vendor VARCHAR(30),'
        + 'sn VARCHAR(30),'
        + 'rack INTEGER'
        +  ')', function (err) {
            if (err) throw err;
        });
    connection.end();
}

module.exports = {
    clearServers: clearServers,
    createServer: createServer,
    getServers: getServers,
    initDB: initDB
}