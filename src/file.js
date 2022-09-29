const {readFile} = require("fs/promises");
const {join} = require("path");
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
                return {
                    error: validationResponse.error,
                    valid: false
                }
            }

            
        return {valid: true} ;
    }

    static async isValidFile(csvString, options = DEFAULT_OPTIONS) {
        const [header, ...items] = csvString.split("\n");
        const isHeaderValid = header === options.fields.join(",");
        const isEmptyFile = items.length === 0;
        const isContentlengthAccepted = (items.length > 0 && items.length <= options.maxLines);
        
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

            if(!isContentlengthAccepted) {
                return {
                    error: error.MAX_LINES_ERROR,
                    valid: false
                }
            }

            return {valid: true}
    }

    static async getFileContent(filePath) {
        const fileName = join(__dirname, filePath);
        return (await readFile(fileName)).toString("utf8"); 
    }
}

(async () => {
    const resultHeader = await File.csvToJson("../mocks/invalidHeader-invalid.csv");
    const resultEmpty = await File.csvToJson("../mocks/emptyFile-invalid.csv");
    const resultLength = await File.csvToJson("../mocks/fourItems-invalid.csv");
    const resultValid = await File.csvToJson("../mocks/threeItems-valid.csv");

    console.log(resultHeader, resultEmpty, resultLength, resultValid);

})();