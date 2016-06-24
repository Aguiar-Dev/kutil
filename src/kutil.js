const moment = require('moment');
const colors = require('colors');

// this will help format the json
const utils = require('util');

exports.debug = (title, data, status, logtype) => {
  // Time formater
  const time = moment().format('ddd, MM/Do/YY, h:mm:ssa');
  const seperator = '\n==============================================\n';
  let log;

  function arrange(logTitle, logStatus, logData) {
    return '\n[' + time + ']: ' + logTitle + ':\n' + logStatus + seperator
            + colors.gray(utils.format('%j', logData)) + '\n';
  }
  if (process.env.DEBUG) {
    switch (logtype.toLowerCase()) {
      case 'log':
        log = arrange(title.green, status.green, data);
        console.log(log);
        break;
      case 'warn':
        log = arrange(title.yellow, status.yellow, data);
        console.warn(log);
        break;
      case 'error':
        log = arrange(title.red, status.red, data);
        console.error(log);
        break;
      default:
        log = arrange('ERROR LOGGING', 'Parameter Error', 'ERROR DATA: Params were erroneous');
        console.log(log);
        break;
    }
  }
};
