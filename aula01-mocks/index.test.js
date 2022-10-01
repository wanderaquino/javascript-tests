const {error} = require("./src/errorConstants");
const File = require("./src/file");
const {rejects, deepStrictEqual} = require("assert");

(async () => {
    const responseInvalidHeader = File.csvToJson("./mocks/invalidHeader-invalid.csv");
    const rejectionError = new Error(error.INVALID_HEADER_ERROR);
    await rejects(responseInvalidHeader, rejectionError);

    const responseEmptyFile = File.csvToJson("./mocks/emptyFile-invalid.csv");
    const emptyFileError = new Error(error.EMPTY_FILE);
    await rejects(responseEmptyFile, emptyFileError);

    const responseFileLength = File.csvToJson("./mocks/fourItems-invalid.csv");
    const resultFileLength = new Error(error.MAX_LINES_ERROR);
    await rejects(responseFileLength, resultFileLength);

    const responseHeaderFile = File.csvToJson("./mocks/invalidHeader-invalid.csv");
    const headerFileExtension = new Error(error.INVALID_HEADER_ERROR);
    await rejects(responseHeaderFile, headerFileExtension);

    const responseValidfile = await File.csvToJson("./mocks/threeItems-valid.csv");
    const expected = [
        {
            "name": "Wander Aquino",
            "id": 123,
            "profession": "Tech",
            "birthDate": 1989
        },
        {
            "name": "Charles Nelson",
            "id": 456,
            "profession": "Contabilist",
            "birthDate": 1977
        },
        {
            "name": "Chalres Albert",
            "id": 789,
            "profession": "Student",
            "birthDate": 2000
        }
       ]

       deepStrictEqual(JSON.stringify(responseValidfile), JSON.stringify(expected));
   
})();