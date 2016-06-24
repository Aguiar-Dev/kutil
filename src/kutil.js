const moment = require('moment');
const colors = require('colors');

// this will help format the json
const utils = require('util');

// Util Debug
exports.debug = (title, data, status, logtype) => {
  // Time formater and local variables
  const time = moment().format('ddd, MM/Do/YY, h:mm:ssa');
  const seperator = '\n==============================================\n';
  let log;

  // function to format the log structure
  function arrange(logTitle, logStatus, logData) {
    return '\n[' + time + ']: ' + logTitle + ':\n' + logStatus + seperator
            + colors.gray(utils.format('%j', logData)) + '\n';
  }
  // Check to see if in DEBUG mode
  if (process.env.DEBUG) {
    // switch statement to differ all log types
    switch (logtype.toLowerCase()) {
      case 'log':
        // run the arrange function for log
        log = arrange(title.green, status.green, data);
        console.log(log);
        break;
      case 'warn':
        // run the arrange function for warn
        log = arrange(title.yellow, status.yellow, data);
        console.warn(log);
        break;
      case 'error':
        // run the arrange function for error
        log = arrange(title.red, status.red, data);
        console.error(log);
        break;
      default:
        // run if no other matches are found insied of this statement
        log = arrange('ERROR LOGGING', 'Parameter Error', 'ERROR DATA: Params were erroneous');
        console.log(log);
        break;
    }
  }
};
