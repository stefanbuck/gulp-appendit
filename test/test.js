var fs = require('fs')
  , read = fs.readFileSync
  , should = require('should'),
  gutil = require('gulp-util'),
  appendit = require('../');


describe('gulp-appendit', function () {

  var helper = function (fixture, expected, options, done) {

    var fixtureFile = new gutil.File({
      path: 'test/fixtures/' + fixture,
      cwd: 'test/',
      base: 'test/fixtures',
      contents: read('test/fixtures/' + fixture)
    });

    var expectedFile = new gutil.File({
      path: 'test/expected/' + expected,
      cwd: 'test/',
      base: 'test/expected',
      contents: read('test/expected/' + expected)
    });


    var stream = appendit(options);

    stream.on('error', function (err) {
      should.exist(err);
      done(err);
    });

    stream.on('data', function (newFile) {

      should.exist(newFile);
      should.exist(newFile.contents);

      String(newFile.contents).should.equal(String(expectedFile.contents));
      done();
    });

    stream.write(fixtureFile);
    stream.end();
  }

  var helperErr = function (options, throwMessage) {

    var fixtureFile = new gutil.File({
      path: 'test/fixtures/default.html',
      cwd: 'test/',
      base: 'test/fixtures',
      contents: read('test/fixtures/default.html')
    });

    (function () {
      var stream = appendit(options);
      stream.write(fixtureFile);
      stream.end();
    }).should.throw(throwMessage);
  }

  it('default', function (done) {
    helper('default.html', 'default.html', {
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    }, done)
  })

  it('already there', function (done) {
    helper('already_there.html', 'already_there.html', {
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    }, done)
  })

  it('already there multiple', function (done) {
    helper('already_there_multiple.html', 'already_there_multiple.html', {
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    }, done);
  })

  it('multiple last', function (done) {
    helper('multiple.html', 'multiple_last.html', {
      matchIndex: 'last',
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    }, done)
  })

  it('multiple -1', function (done) {
    helper('multiple.html', 'multiple_last.html', {
      matchIndex: -1,
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    }, done)
  })

  it('multiple first', function (done) {
    helper('multiple.html', 'multiple_first.html', {
      matchIndex: 'first',
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    }, done)
  })

  it('multiple 0', function (done) {
    helper('multiple.html', 'multiple_first.html', {
      matchIndex: 0,
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    }, done)
  })

  it('multiple second', function (done) {
    helper('multiple.html', 'multiple_second.html', {
      matchIndex: 1,
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    }, done)
  })

  it('without options', function () {
    helperErr(undefined, 'Missing options for gulp-appendit');
  });

  it('options with source', function () {
    helperErr({
      source: ''
    }, 'No content given.');
  });

  it('options with content', function () {
    helperErr({
      source: '',
      content: []
    }, 'No anchor given.');
  });

  it('options with all required parameters', function () {

  });
})


