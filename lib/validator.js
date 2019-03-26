module.exports = {
    check: (data) => {
        // ==========================
        // Needs complete refactoring
        return data;
        // ==========================
        error = [];

        for (var key in data.input) {
            if (typeof data.input[key] == "undefined"|| data.input[key] == "" || data.input[key] == null) {
                error.push("'" + key + "' not set");
                data.status.error = true;
            }
            switch (key) {
                case "description":
                    data[key] = encodeURI(data[key]);
                break;
                case "email":
                    if (encodeURI(data[key]) != data[key]) {
                        error.push("'" + key + "' must not contain special characters");
                        success = false;
                    }
                break;
                case "password":
                    if (encodeURI(data[key]) != data[key]) {
                        error.push("'" + key + "' must not contain special characters");
                        success = false;
                    }
                break;
                case "taskid":
                if (isNaN(data[key])) {
                    error.push("'" + key + "' must be integer");
                        success = false;
                    }
                break;
                case "title":
                    data[key] = encodeURI(data[key]);
                break;
                case "userid":
                    if (isNaN(data[key])) {
                        error.push("'" + key + "' must be integer");
                        success = false;
                    }
                break;
            }           
        }
        data.response = {success: success, message: error};
        return data;
    }
}