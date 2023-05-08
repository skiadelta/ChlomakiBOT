const FileSystem = require('fs');
const Path = require('path');

module.exports = (dir, foldersOnly = false) => {
    let fileNames = [];

    const Files = FileSystem.readdirSync(directory, {withFileTypes: true});

    for (const File of Files){
        const filePath = Path.join(directory, file.name)

        if (foldersOnly){
            if (File.isDirectory()){
                 fileNames.push(filePath)
            }
        } else {
            if (file.isFile()){
                fileNames.push(filePath)
            }
        }
    }

    return fileNames;
};