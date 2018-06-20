var mysql = require('mysql');

// Initialize connection
function dbConnection(credentials) {
    var connOptions = {
            host     : credentials.hostname,
            user     : credentials.username,
            password : credentials.password ,
            database : credentials.name
    }
    console.log(connOptions)
	return mysql.createConnection(connOptions);
}

module.exports = {
    dbConnection: dbConnection
}