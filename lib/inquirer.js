const inquirer = require('inquirer');

module.exports = {
    askForPrompt: () => {
        const questions = [
            {
                name: "command",
                type: "input",
                message: "Enter a command",
                valdiate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return "Please enter a value";
                    }
                }
            }
        ];
        return inquirer.prompt(questions);
    }
}