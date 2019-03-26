const mysql = require('mysql');
const mysql_config = {
    host : '127.0.0.1',
    user : 'root',
    database : 'db',
    password : '',
    multipleStatements : true
};

function startConnection() {
    connection = mysql.createConnection(mysql_config);
    connection.connect((error) => {
        if (error) {
            startConnection();
        }
    });
    connection.on('error',(error) => {
        if (error.fatal) {
            startConnection();
        }
    });
}

startConnection();

module.exports = {
    query: (data) => {

        var query;
        switch (data.action) {
            case "adduser":
            query = "INSERT IGNORE INTO user (email, password)" +
            "SELECT '" + data.input.email + "','" + data.input.password + "' " +
            "WHERE NOT EXISTS (SELECT 1 FROM user WHERE email = '" + data.input.email + "');";
            break;
            case "deleteuser":
            query = "DELETE FROM user WHERE id=" + data.input.userid + ";" +
            "DELETE FROM tasks WHERE tasks.id in (SELECT t.task FROM taskuser t WHERE t.owner ='" + data.input.userid + "');" +
            "DELETE FROM taskuser WHERE owner=" + data.input.userid + ";" +
            "DELETE FROM taskuser WHERE user=" + data.input.userid + ";";
            break;
            case "userExists":
            query = "SELECT COUNT(*) as total FROM user WHERE id ='" + data.input.userid + "';";
            break;
            case "taskExists":
            query = "SELECT COUNT(*) as total FROM tasks WHERE id ='" + data.input.taskid + "';";
            break;
            case "addtask":
            query = "INSERT INTO tasks (title, description, startdate) VALUES ('" + data.input.title + "', '" + data.input.description + "', " + Math.round((new Date()).getTime() / 1000) + ");" +
            "SET @last_id_in_tasks = LAST_INSERT_ID();" +
            "INSERT INTO taskuser (task, user, owner) VALUES (@last_id_in_tasks," + data.input.userid + ", '" + data.input.userid + "');";
            break;
            case "deletetask":
            query = "DELETE FROM tasks WHERE id=" + data.input.taskid + ";" +
            "DELETE FROM taskuser WHERE task=" + data.input.taskid + ";";
            break;
            case "showtasks": 
            query = "SELECT * FROM tasks WHERE tasks.id in (SELECT tu.task FROM taskuser tu WHERE tu.user ='" + data.input.userid + "' OR tu.owner ='" + data.input.userid + "')";
            break;
            default: 
            query = "";
        }
        return new Promise((resolve, reject) => {
            connection.query(query, (error, result) => {
                if (error) {
                    data.status.error = true;
                    data.status.code = error.code;
                    return reject(data);
                }
                data.output = result;
                return resolve(data);
            });
        }).catch((data => {
            return data;              
        }));
    }
}