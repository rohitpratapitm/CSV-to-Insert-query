// run `node index.js` in the terminal
let fs = require('fs');
let csv = require('fast-csv');
let moment = require('moment');

function readExcel(name) {
  var stream = fs.createReadStream(name);
  csv
    .parseStream(stream, { headers: true })
    .on('data', function (data) {
      console.log(generateMenu(data));
    })
    .on('end', function () {
      console.log('done');
    });
}

function generateCustomer(data) {
  const dob = getDob();
  const password = generatePassword();
  return `insert into customer values (seq_customer.nextval, '${data.firstname}', '${data.lastname}', '${data.email}', DATE '${dob}',${data.phone1}, '${password}');`;
}

function generateInventory(data) {
  return `insert into inventory values (seq_inventory.nextval, '${data.itemname}', '${data.category}', ${data.quantity});`;
}

function generateDiningTable() {
  const status = 'Empty';
  const capacity = Math.floor(Math.random() * (10 - 2) + 2);
  const randomIndex = Math.floor(Math.random() * (3 - 0) + 0);
  const locations = ['Corner', 'Center', 'Outside'];
  const location = locations[randomIndex];
  return `insert into diningtable values (seq_diningtable.nextval, '${status}', ${capacity}, '${location}');`;
}

function generateStaffSchedule(staffId, month, year, shift) {
  const daysInAMonth = daysInMonth(month, year);
  for (var i = 1; i <= daysInAMonth; i++) {
    if (i % 7 === 0) {
      // Sunday is a holiday
      continue;
    }
    const date = i < 10 ? `0${i}` : i;
    console.log(
      `insert into schedule values (${staffId}, DATE '${year}-${month}-${date}', TIMESTAMP '${year}-${month}-${date} ${shift.startTime}', TIMESTAMP '${year}-${month}-${date} ${shift.endTime}');`
    );
  }
}

function generateScheduleForStaff() {
  const shifts = ['morning', 'afternoon', 'evening'];
  const shiftTiming = new Map();
  shiftTiming.set(shifts[0], { startTime: '06:00:00', endTime: '12:00:00' });
  shiftTiming.set(shifts[1], { startTime: '12:00:00', endTime: '18:00:00' });
  shiftTiming.set(shifts[2], { startTime: '18:00:00', endTime: '00:00:00' });

  for (var staffId = 1; staffId <= 6; staffId++) {
    generateStaffSchedule(staffId, 02, 2022, shiftTiming.get('morning'));
  }

  for (var staffId = 7; staffId <= 12; staffId++) {
    generateStaffSchedule(staffId, 02, 2022, shiftTiming.get('afternoon'));
  }

  for (var staffId = 13; staffId <= 20; staffId++) {
    generateStaffSchedule(staffId, 02, 2022, shiftTiming.get('evening'));
  }
}

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

function generateMenu(data) {
  const price = Math.floor(Math.random() * (100 - 10) + 10);
  return `insert into menu values (seq_menu.nextval, '${data.itemname}', '${data.category}', ${price});`;
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
// readExcel('inventory.csv');
// for (var i = 0; i < 20; i++) {
//   console.log(generateDiningTable());
// }

generateScheduleForStaff();
