const Path = require('path')
const getAllFiles = require("./utils/getAllFiles");

module.exports = (client) => {
    const Folders = getAllFiles(Path.join(__dirname, "..", "events"), true);

    console.log(Folders)
};