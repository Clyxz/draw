const dbconnector = require('./dbconnector');
const validator = require('./validator');

module.exports = {
    adduser : async(data) => {
        try {
            data = validator.check(data);
            if (data.status.error) {
                return data;
            }

            return await dbconnector.query(data).then((data) => {
                if(!data.status.error) {
                    if (data.output.affectedRows == 0) {
                        data.status.error = true;
                        data.status.code = "Account already exists";
                        return data;
                    } else {
                        data.status.code = "User added";
                        return data;
                    }
                } else {
                    return data;
                }
            });     
        } catch (error) {
            data.status.error = true;
            data.status.code = error;
            return data;
        }
    },
    deleteuser : async(data) => {
        try {
            data = validator.check(data);
            if (data.status.error) {
                return data;
            }
            userExists = await module.exports.userExists(data);
            if (userExists.status.error) {
                return userExists;
            }

            return await dbconnector.query(data).then((data) => {
                if(!data.status.error) {
                    data.status.code = "User (ID: " + data.input.userid + ") deleted";
                    return data;
                } else {
                    return data;
                }
            });
        } catch (error) {
            data.status.error = true;
            data.status.code = error;
            return data;
        }
    },
    userExists : async(data) => {
        try {
            this.data = Object.assign({}, data);
            this.data.action = "userExists";

            return await dbconnector.query(this.data).then((result) => {
                if(!result.status.error) {
                    if (result.output[0].total == 1) {
                        return data;
                    } else {
                        data.status.error = true;
                        data.status.code = "User (id: " + data.input.userid + ") does not exist";
                        return data;
                    }
                } else {
                    return data;
                }
            });
        } catch (error) {
            data.status.error = true;
            data.status.code = error;
            return data;
        }
    },
    taskExists : async(data) => {
        try {
            this.data = Object.assign({}, data);
            this.data.action = "taskExists";

            return await dbconnector.query(this.data).then((result) => {
                if (!result.status.error) {
                    if (result.output[0].total == 1) {
                        return data;
                    } else {
                        data.status.error = true;
                        data.status.code = "Task (id: " + data.input.taskid + ") does not exist";
                        return data;
                    }
                } else {
                    return data;
                }
            });        
        } catch (error) {
            data.status.error = true;
            data.status.code = error;
            return data;
        }
    },
    addtask : async(data) => {
        try {
            data = validator.check(data);
            if (data.status.error) {
                return data;
            }

            userExists = await module.exports.userExists(data);
            if (userExists.status.error) {
                return userExists;
            }

            return await dbconnector.query(data).then((data) => {
                if (!data.status.error) {
                    data.status.code = "Task added";
                    return data;
                }
            });        
        } catch (error) {
            data.status.error = true;
            data.status.code = error;
            return data;
        }
    },
    deletetask : async(data) => {
        try {
            data = validator.check(data);
            if (data.status.error) {
                return data;
            }
            taskExists = await module.exports.taskExists(data);
            if (taskExists.status.error) {
                return taskExists;
            }

            return await dbconnector.query(data).then((data) => {
                if (!data.status.error) {
                    data.status.code = "Task (id: " + data.input.taskid + ") deleted";
                    return data;
                }
            });           
        } catch (error) {
            data.status.error = true;
            data.status.code = error;
            return data;
        }
    },
    showtasks : async(data) => {
        try {
            data = validator.check(data);
            if (data.status.error) {
                return data;
            }
            userExists = await module.exports.userExists(data);
            if (userExists.status.error) {
                return userExists;
            }
   
            return await dbconnector.query(data).then((data) => {
                if (!data.status.error) {
                    return data;
                }
            });  
        } catch (error) {
            data.status.error = true;
            data.status.code = error;
            return data;
        }
    }
}