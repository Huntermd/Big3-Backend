// Name the file database.js to use 
const mysql = require("mysql2")

const mysqlConnection = mysql.createConnection({
    //Replace everything with the needed things
    host:host,
    user: username,
    password: password,
    database : databaseName
})

mysqlConnection.connect((err) =>{
    if(err){
        console.log('failed database')
    }else{
        console.log('It did not fail ')
    }
})








module.exports = mysqlConnection;