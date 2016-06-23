const util = require('../src/kutil');
const expect = require('chai').expect;
const fs = require('fs');
const async = require('async');
const sinon = require('sinon');

// Best cocktail in the world
// test it out, you will enjoy like it.
const oldFashion = {
  first: 'Cherry, Sugar Cube, Bitters, Orange Peel',
  second: 'Muddle',
  third: 'Ice Bourbon, Rye Whiskey',
  fourth: 'Stir and DrinK',
};

describe('Util Debug Tool', () => {
  // After the test it will clear out the log file with a empty string.
  after((done) => {
    fs.writeFile('./logs/logfile.log', ' ', (err) => {
      if (err) throw err;
    });
    console.log.restore();
    done();
  });

  // Test for the debug tool to make sure it
  // passes the title, object and status to the logfile.log
  it('Should append and read the logfile.log file to check object', (done) => {
    // Counting the console.log. Istanbul is still not counting
    sinon.spy(console, 'log');
    util.debug('Old Fashion', oldFashion, 200);
    expect(console.log.callCount).to.be.equal(1);

    // Using Async to pass values function to function.
    async.waterfall([
      async.apply(append, oldFashion),
      read,
    ], (err, result) => {
      // result now equals 'done'
      result();
    });
    function append(oldFashion, callback) {
      // Testing the append function of util. It will append a object.
      fs.appendFile('./logs/logfile.log', oldFashion, { flags: 'a' }, (err) => {
        if (err) throw err;
        callback(null, oldFashion);
      });
    }
    function read(callback) {
      // Open the file with read privileges only, then make it human readable.
      fs.readFile('./logs/logfile.log', 'utf8', (err, data) => {
        if (err) throw err;
        // Check the data to see if it has the data I pass to the debug tool.
        expect(data).to.have.string('{"first":"Cherry, Sugar Cube, Bitters,' +
                ' Orange Peel","second":"Muddle","third":"Ice Bourbon,' +
                ' Rye Whiskey","fourth":"Stir and DrinK"}');
        callback(null, done());
      });
    }
  });
});

// Util Bump Unit Test
describe('Util Version Bump', () => {
  // Setup local scope variables:
  // version for initial version # for each test
  // set newver for expects
  const version = '1.2.3';
  let newver;

  // Test for the Major Version Bump
  it('| Should bump the version number by MAJOR', (done) => {
    // run the util bump with the major param
    // then expect the returned value to be correct
    newver = util.bump(version, 'major');
    expect(newver).to.be.equal('2.0.0');
    done();
  });

  // Test for the Minor Version Bump
  it('| Should bump the version number by MINOR', (done) => {
    // run the util bump with the minor param
    // then expect the returned value to be correct
    newver = util.bump(version, 'MINOR');
    expect(newver).to.be.equal('1.3.0');
    done();
  });

  // Test for the Patch Version Bump
  it('| Should bump the version number by PATCH', (done) => {
    // run the util bump with the patch param
    // then expect the returned value to be correct
    newver = util.bump(version, 'PaTcH');
    expect(newver).to.be.equal('1.2.4');
    done();
  });

  // Test for Error return after LABEL is passed in incorrectly
  it('| Should return error for incorrect LABEL', (done) => {
    // run the util bump with the hello param, expecting error response
    newver = util.bump(version, 'Hello');
    expect(newver).to.be.equal('error');
    done();
  });

  // Test for Error return after incorrect version string formatting is passed in
  it('| Should return error for incorrect VERSION STRING', (done) => {
    // run the util bump with the incorrect version string, expecting error response
    newver = util.bump('1.2.4.5.6.7.8.9', 'minor');
    expect(newver).to.be.equal('error');
    done();
  });
});
