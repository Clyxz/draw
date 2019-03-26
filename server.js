const chalk = require('chalk');
const clear = require('clear');
 
function startUp() {
    clear();
    console.log(chalk.red("App Started"));
}

processCommand = async(value) => {
    try {
        var cmd = value.split(" ");
        switch (cmd[0]) {
            case "adduser":
                dbactions.adduser(
                    {   action: "adduser",
                        input: {
                            email: cmd[1], 
                            password: cmd[2]
                        },
                        output: {},
                        status: {
                            error: false,
                            code: ""
                        }
                    }).then((result) => {
                    console.log(result)
                    getCommand();
                });
            break;
            case "deleteuser":
                dbactions.deleteuser(
                    {
                        action: "deleteuser", 
                        input: {
                            userid: cmd[1]
                        },
                        output: {},
                        status: {
                            error: false,
                            code: ""
                        }
                    }).then((result) => {
                    console.log(result)
                    getCommand();
                });
            break;
            case "addtask":
                dbactions.addtask(
                    {   action: "addtask", 
                        input: {
                            title: cmd[1], 
                            description: cmd[2], 
                            userid: cmd[3]
                        },
                        output: {},
                        status: {
                            error: false,
                            code: ""
                        } 
                    }).then((result) => {
                    console.log(result)
                    getCommand();
                });
            break;
            case "deletetask":
                dbactions.deletetask(
                    {   action: "deletetask", 
                        input: {
                            taskid: cmd[1]
                        },
                        output: {},
                        status: {
                            error: false,
                            code: ""
                        } 
                    }).then((result) => {
                    console.log(result)
                    getCommand();
                });
            break;
            case "showtasks":
                dbactions.showtasks(
                    {   action: "showtasks", 
                        input: {
                            userid: cmd[1]
                        },
                        output: {},
                        status: {
                            error: false,
                            code: ""
                        } 
                    }).then((result) => {
                    console.log(result)
                    getCommand();
                });
            break;
            case "exit":
                process.exit(0);
            break;
            case "help":
                console.log(chalk.white(cmd[0] + ": Commands:\n exit \n help\n adduser\n showtasks\n addtask\n deletetask"));
                getCommand()
            break;   
            default:
                console.log(chalk.white(cmd[0] + ": Command not found. Enter 'help' for command list"));
                getCommand();
            break;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

const dbactions = require('./lib/dbactions');
const inquirer = require('./lib/inquirer');

getCommand = async() => {
    try {
        inquirer.askForPrompt().then((command) => {
            processCommand(command.command);
        }).catch((error) => {
            console.log(error);
        });
        
    } catch (error) {
        console.log(error)
    }
}

startUp();
processCommand("help");
