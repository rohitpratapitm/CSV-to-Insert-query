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
      // if (i >= 0 && i <= 20) {
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
  const password = generatePassword();
  return `insert into customer values (seq_customer.nextval, '${data.firstname}', '${data.lastname}', '${data.email}', DATE '${dob}',${data.phone1}, '${password}');`;
}

function getDob() {
  const dobString = randomDate(new Date(1950, 0, 1), new Date(2012, 0, 1));
  return moment(dobString).format('yyyy-MM-DD');
}

function generateStaff(data) {
  const dob = getDob();
  const role = staffRole();
  const password = generatePassword();
  if (data.street.length > 30) {
    data.street = data.street.substring(0, 30);
  }
  return `insert into staff values (seq_staff.nextval, '${data.firstname}', '${data.lastname}', '${data.email}', DATE '${dob}',${data.phone1}, '${password}', '${role}', '${data.street}', '${data.city}', '${data.state}', ${data.zip});`;
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

function generatePassword() {
  var length = 30;
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

console.log(`Hello Node.js v${process.versions.node}!`);
