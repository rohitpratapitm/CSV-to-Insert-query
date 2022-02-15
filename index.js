// run `node index.js` in the terminal
let fs = require('fs');
let csv = require('fast-csv');
let moment = require('moment');

var stream = fs.createReadStream('us-500.csv');
var i = 0;
csv
  .parseStream(stream, { headers: true })
  .on('data', function (data) {
    if (i >= 480 && i <= 500) {
      // console.log(generateCustomer(data));
      console.log(generateStaff(data));
    }
    i++;
  })
  .on('end', function () {
    console.log('done');
  });

function generateCustomer(data) {
  const dob = getDob();
  return `insert into customer values (seq_customer.nextval, '${data.firstname}', '${data.lastname}', '${data.email}', DATE '${dob}',${data.phone1}, 'amJ1dHRAZ21haWwuY29t');`;
}

function getDob() {
  const dobString = randomDate(new Date(1950, 0, 1), new Date(2012, 0, 1));
  return moment(dobString).format('yyyy-MM-DD');
}

function generateStaff(data) {
  const dob = getDob();
  const role = staffRole();
  return `insert into staff values (seq_staff.nextval, '${data.firstname}', '${data.lastname}', '${data.email}', DATE '${dob}',${data.phone1}, 'amJ1dHRAZ21haWwuY29t', '${role}', '${data.street}', '${data.city}', '${data.state}', ${data.zip});`;
}

function staffRole() {
  const roles = ['Server', 'Chef', 'Management'];
  const randomIndex = Math.floor(Math.random() * (3 - 0) + 0);
  return roles[randomIndex];
}

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

console.log(`Hello Node.js v${process.versions.node}!`);
