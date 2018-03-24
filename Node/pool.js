var mysql = require('mysql');

//Put your mysql configuration settings - user, password, database and port
function getConnection(){
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'kirati',
        database : 'freelancer'
    });
    return connection;
}


function fetchData(callback,sqlQuery ){

    var connection=getConnection();



    connection.query(sqlQuery, function(err, rows, fields) {
        if(err){
            console.log("ERROR: " + err.message);
            callback(err, rows);
        }
        else
        {	// return err or result
            // console.log('abc');
            //  console.log(rows.toString());
            //  console.log(fields);
            callback(err, rows);
        }
    });

    console.log("\nConnection closed..");
    connection.end();
}

exports.fetchData=fetchData;