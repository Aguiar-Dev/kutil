exports.debug = (title, obj, status) => {
  const moment = require('moment');
  const colors = require('colors');
  const fs = require('fs');
  // this will help format the json
  const utils = require('util');

  // Time formater
  const time = moment().format('ddd, MM/Do/YY, h:mm:ssa');

  const seperator = '\n--------------\n';

  // This is the payload for the append file function
  const pkg = colors.yellow('[' + time + ']') + ' ' + colors.white(title) +
  ' ' + colors.gray(utils.format('%j', obj)) + ' ' + colors.blue(status) + seperator;

  const pkglog = '[' + time + ']' +
  ' ' + title + ' ' + utils.format('%j', obj) + status + seperator;

  // if developer passes DEBUG=true it will show logging and will save to log file.
  if (process.env.DEBUG) {
    // using the file system to append to existing file with a flage of append.
    // passing in the package string.
    console.log(pkg);
    fs.appendFile('logs/logfile.log', pkglog, { flags: 'a' }, (err) => {
      if (err) throw err;
    });
  }
};

exports.log = (title, _arg, _arg1, _arg2) => {
  const pkg = title + ':\t';
  console.log(pkg, _arg);
};

exports.bump = (curver, label) => {
  // sets each indivial character of the current version,
  // number to a array of integers after splitting the string
  let splitver = curver.split('.').map(Number);
  // verifying the label param in either lowercase or uppercase :)
  const lowlabel = label.toLowerCase();

  if (lowlabel === 'major') {
    // Increases the major tag on the current version number
    splitver[0]++;
    splitver[1] = 0;
    splitver[2] = 0;
  } else if (lowlabel === 'minor') {
    // Increases the minor tag on the current version number
    splitver[1]++;
    splitver[2] = 0;
  } else if (lowlabel === 'patch') {
    // Increases the patch tag on the current version number
    splitver[2]++;
  } else {
    // if label was something other than major.minor.patch it will return error string
    splitver = 'error';
    return splitver;
  }

  // joins the integer array into a string once again,
  // this time as the new version number and returns the data
  splitver = splitver.join('.');
  return splitver.toString();
};
