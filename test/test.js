var fs = require('fs')
  , read = fs.readFileSync
  , should = require('should'),
  gutil = require('gulp-util'),
  appendit = require('../');

function fixture(name) {
  return read('test/fixtures/' + name, 'utf8');
}

function expected(name) {
  return read('test/expected/' + name, 'utf8');
}

var equalHelper = function (options, fixtureFilename, expectedFilename, done) {
  var fixtureFile = new gutil.File({
    path: 'test/fixtures/' + fixtureFilename,
    cwd: 'test/',
    base: 'test/fixtures',
    contents: read('test/fixtures/' + fixtureFilename)
  });

  var expectedFile = new gutil.File({
    path: 'test/expected/' + expectedFilename,
    cwd: 'test/',
    base: 'test/expected',
    contents: read('test/expected/' + expectedFilename)
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

var errorHelper = function (options, throwMessage) {

  var fixtureFile = new gutil.File({
    path: 'test/fixtures/single.html',
    cwd: 'test/',
    base: 'test/fixtures',
    contents: read('test/fixtures/single.html')
  });

  (function () {
    var stream = appendit(options);
    stream.write(fixtureFile);
    stream.end();
  }).should.throw(throwMessage);
}

describe('html', function () {

  it('should append a script tag', function (done) {
    var options = {
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    };
    equalHelper(options, 'single.html', 'single.html', done);
  })

  it('should append two script tags', function (done) {
    var options = {
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>',
        '<script src="b.js"></script>'
      ]
    };
    equalHelper(options, 'single.html', 'single_add_multiple.html', done);
  });

  it('shouldn\'t append a script tag', function (done) {
    var options = {
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    };
    equalHelper(options, 'single.html', 'single.html', done);
  })

  it('shouldn\'t append any script tag', function (done) {
    var options = {
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    };
    equalHelper(options, 'multiple_with_content.html', 'multiple_with_content.html', done);
  })

  it('should append a script tag on the last anchor position. [matchIndex: \'last\']', function (done) {
    var options = {
      matchIndex: 'last',
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    };
    equalHelper(options, 'multiple.html', 'multiple_last.html', done);
  })

  it('should append a script tag on the last anchor position. [matchIndex: -1]', function (done) {
    var options = {
      matchIndex: -1,
      source: fixture('multiple.html'),
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    };
    equalHelper(options, 'multiple.html', 'multiple_last.html', done);
  })

  it('should append a script tag on the fist anchor position. [matchIndex: \'first\']', function (done) {
    var options = {
      matchIndex: 'first',
      source: fixture('multiple.html'),
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    };
    equalHelper(options, 'multiple.html', 'multiple_first.html', done);
  })

  it('should append a script tag on the fist anchor position. [matchIndex: 0]', function (done) {
    var options = {
      matchIndex: 0,
      source: fixture('multiple.html'),
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    };
    equalHelper(options, 'multiple.html', 'multiple_first.html', done);
  })

  it('should append a script tag on the second anchor position. [matchIndex: 1]', function (done) {
    var options = {
      matchIndex: 1,
      source: fixture('multiple.html'),
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    };
    equalHelper(options, 'multiple.html', 'multiple_second.html', done);
  })

  it('should append the same script tag again', function (done) {
    var options = {
      anchor: '<!-- anchor -->',
      check: false,
      content: [
        '<script src="a.js"></script>'
      ]
    };
    equalHelper(options, 'single_with_content.html', 'single_insert.html', done);
  });

  it('without options', function () {
    errorHelper(undefined, 'Missing options for gulp-appendit');
  });

  it('empty options', function () {
    errorHelper({}, 'No content given.');
  });

  it('options with source', function () {
    errorHelper({
      source: ''
    }, 'No content given.');
  });

  it('options with content', function () {
    errorHelper({
      source: '',
      content: []
    }, 'No anchor given.');
  });

  it('options with all required parameters', function () {
    var fixtureFile = new gutil.File({
      path: 'test/fixtures/single.html',
      cwd: 'test/',
      base: 'test/fixtures',
      contents: read('test/fixtures/single.html')
    });

    var options = {
      anchor: '<!-- anchor -->',
      content: [
        '<script src="a.js"></script>'
      ]
    };

    (function () {
      var stream = appendit(options);
      stream.write(fixtureFile);
      stream.end();
    }).should.not.throw();
  });



})


