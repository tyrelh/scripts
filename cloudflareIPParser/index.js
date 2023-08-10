const fs = require("fs");
const { parse } = require("csv-parse");

const threshold = 100;
const data = []

fs.createReadStream("./" + process.argv[2])
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    console.log(row);
    data[row[2]] = (data[row[2]] ? data[row[2]] : 0) + parseInt(row[0])
  })
  .on("end", function () {
    console.log("finished");
    console.log(data);
  })
  .on("error", function (error) {
    console.log(error.message);
  });