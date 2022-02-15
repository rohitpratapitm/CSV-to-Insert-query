// run `node index.js` in the terminal
let fs = require('fs');
let csv = require('fast-csv');
let moment = require('moment');

var stream = fs.createReadStream('us-500.csv');
csv
  .parseStream(stream, { headers: true })
  .on('data', function (data) {
    const dobString = randomDate(new Date(1950, 0, 1), new Date(2012, 0, 1));
    const dob = moment(dobString).format('yyyy-MM-DD');
    console.log(
      `insert into customer values (seq_customer.nextval, ${data.firstname}, ${data.lastname}, ${data.email}, DATE '${dob}',${data.phone1}, 'amJ1dHRAZ21haWwuY29t');`
    );
  })
  .on('end', function () {
    console.log('done');
  });

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

console.log(`Hello Node.js v${process.versions.node}!`);
