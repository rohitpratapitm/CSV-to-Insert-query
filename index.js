// run `node index.js` in the terminal
let fs = require('fs');
let csv = require('fast-csv');

var stream = fs.createReadStream('us-500.csv');
let dob = "'1978-06-07'";
csv
  .parseStream(stream, { headers: true })
  .on('data', function (data) {
    console.log(
      `insert into customer values (seq_customer.nextval, ${data.firstname}, ${data.lastname}, ${data.email}, DATE ${dob},${data.phone1}, 'amJ1dHRAZ21haWwuY29t');`
    );
  })
  .on('end', function () {
    console.log('done');
  });
console.log(`Hello Node.js v${process.versions.node}!`);
