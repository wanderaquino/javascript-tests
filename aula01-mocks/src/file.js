const {readFile} = require("fs/promises");
const User  = require ("./User");
const {error} = require("./errorConstants");

const DEFAULT_OPTIONS = {
    maxLines: 3,
    fields: ["id","name","profession","age"]
}

class File {
    static async csvToJson(filePath) {
        const fileContent = await File.getFileContent(filePath);
        const validationResponse = await File.isValidFile(fileContent);
        if(!validationResponse.valid) {
            throw new Error(validationResponse.error);
        }
        const users = File.parseCsvToJson(fileContent);
        return users;
    }


    static async isValidFile(csvString, options = DEFAULT_OPTIONS) {
        const [header, ...items] = csvString.split("\n");
        const isHeaderValid = header === options.fields.join(",");
        const isEmptyFile = items.length === 0;
        const isContentLengthAccepted = (items.length > 0 && items.length <= options.maxLines);
        
            if(!isHeaderValid) {
                return {
                    error: error.INVALID_HEADER_ERROR,
                    valid: false
                }
            }

            if(isEmptyFile) {
                return {
                    error: error.EMPTY_FILE,
                    valid: false
                }
            }

            if(!isContentLengthAccepted) {
                return {
                    error: error.MAX_LINES_ERROR,
                    valid: false
                }
            }
            return {valid: true};
    }

    static async getFileContent(filePath) {
        return (await readFile(filePath)).toString("utf8");
    }

    static parseCsvToJson (csvString) {
        const lines = csvString.split("\n");
        const firstLine = lines.shift();
        const header = firstLine.split(",");

        const users = lines.map((line) => {
            const columns = line.split(",");

            let user = {};
            for(const index in columns) {
                user[header[index]] = columns[index];
            }

            return new User(user);
        });

        return users;

    }
}

module.exports = File;