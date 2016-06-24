const util = require('../src/kutil');
const expect = require('chai').expect;
const sinon = require('sinon');

describe('Util Logging Test', () => {
  const title = 'Unit Test';
  const data = { data: true };
  const status = 'Running a Test';
  let logcall;
  let warncall;
  let errcall;

  beforeEach((done) => {
    logcall = sinon.spy(console, 'log');
    warncall = sinon.spy(console, 'warn');
    errcall = sinon.spy(console, 'error');
    done();
  });

  afterEach((done) => {
    console.log.restore();
    console.warn.restore();
    console.error.restore();
    done();
  });

  function test(logtype) {
    util.debug(title, data, status, logtype);
    if (logtype === 'log' || logtype === 'warn' || logtype === 'error') {
      switch (logtype) {
        case 'log':
          expect(logcall.called).to.be.equal(true);
          break;
        case 'warn':
          expect(warncall.called).to.be.equal(true);
          break;
        case 'error':
          expect(errcall.called).to.be.equal(true);
          break;
        default:
          break;
      }
    } else {
      expect(logcall.args[0][0]).to.contain('Parameter Error');
    }
  }

  it('| Should test for console.log', (done) => {
    test('log');
    done();
  });
  it('| Should test for console.warn', (done) => {
    test('warn');
    done();
  });
  it('| Should test for console.log', (done) => {
    test('error');
    done();
  });
  it('| Should test for ERROR', (done) => {
    test('random');
    done();
  });
});
