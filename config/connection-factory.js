var mysql = require("mysql");

module.exports = ()=>{
    return mysql.createConnection({
        host: "localhost",
        user:"root",
        password: "@ITB123456",
        database: "unistore",
        port: 3306,
    })
}

