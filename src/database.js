const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DATA_BASE || 'dpipaz'
});

mysqlConnection.connect(function(err){
    if(err){
        console.log(err);
        return;
    }else{
        console.log('Se conectó a la base de datos');
    }
});

module.exports = mysqlConnection;