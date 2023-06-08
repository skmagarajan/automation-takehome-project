"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeToCSV = void 0;
function writeToCSV(name, records) {
    var dateTime = new Date();
    var path = "download/".concat(name, "_").concat(dateTime.toISOString(), ".csv");
    if (records.length > 0) {
        var createCsvWriter = require('csv-writer').createObjectCsvWriter;
        var csvWriter = createCsvWriter({
            path: path,
            header: [
                { id: 'product', title: 'Product' },
                { id: 'price', title: 'Price' },
                { id: 'searchItem', title: 'Search Item' },
                { id: 'link', title: 'Link' }
            ]
        });
        csvWriter.writeRecords(records) // returns a promise
            .then(function () {
            console.log("File saved in: ".concat(path));
        });
    }
    else {
        console.log('No records found');
    }
}
exports.writeToCSV = writeToCSV;
