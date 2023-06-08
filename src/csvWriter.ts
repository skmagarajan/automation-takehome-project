export function writeToCSV(name: string, records: Array<any>): void {
    const dateTime = new Date();
    const path = `download/${name}_${dateTime.toISOString()}.csv`;
    if(records.length > 0) {
      const createCsvWriter = require('csv-writer').createObjectCsvWriter;
      const csvWriter = createCsvWriter({
          path,
          header: [
              {id: 'product', title: 'Product'},
              {id: 'price', title: 'Price'},
              {id: 'searchItem', title: 'Search Item'},
              {id: 'link', title: 'Link'}
          ]
      });
        
      csvWriter.writeRecords(records)       // returns a promise
          .then(() => {
              console.log(`File saved in: ${path}`);
          });
    }
    else{
      console.log('No records found');
    }
  }