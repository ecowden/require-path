var fs = require('fs');
var path = require('path');
var join = path.join;
var fixturePath = join(__dirname, 'fixtures');
var _ = require('highland');
var expect = require('chai').expect;
var getFilteredFiles = require('../lib/getFilteredFiles.js');

describe("index", function() {

  it('returns a Highland stream', function(done) {
    var actual = getFilteredFiles(testOptions({}));
    expect(_.isStream(actual)).to.be.true;
    actual.done(done);
  });

  it('includes files that match the `include` option', function(done) {
    var actual = getFilteredFiles(testOptions({
      include: ['**/*.js']
    }));
    actual.filter(function(file) {
      return endsWith(file, '.js');
    }).toArray(function(files) {
      expect(files.length).to.equal(3);
      done();
    });
  });

  it('excludes files that are not included by the `include` option', function(done) {
    var actual = getFilteredFiles(testOptions({
      include: ['**/*.js']
    }));
    actual.filter(function(file) {
      return endsWith(file, '.junk');
    }).toArray(function(files) {
      expect(files.length).to.equal(0);
      done();
    });
  });

  it('excludes files listed in the `exclude` option', function(done) {
    var actual = getFilteredFiles(testOptions({
      include: ['**/*.js'],
      exclude: ['**/*Spec.js']
    }));
    actual.filter(function(file) {
      return endsWith(file, 'Spec.js');
    }).toArray(function(files) {
      expect(files.length).to.equal(0);
      done();
    });
  });

  it('uses the options.path as the root for inclusions and rejections', function(done) {
    var actual = getFilteredFiles(testOptions({
      include: ['dir1/inner.js']
    }));
    actual.filter(function(file) {
      return endsWith(file, 'dir1/inner.js');
    }).toArray(function(files) {
      expect(files.length).to.equal(1);
      done();
    });
  });

  it('all files are absolute', function(done) {
    var actual = getFilteredFiles(testOptions({
      include: ['**/*.js']
    }));
    actual.each(function(file) {
      expect(path.isAbsolute(file)).to.be.true;
    }).done(done);
  });

  it('all files are really files', function(done) {
    var actual = getFilteredFiles(testOptions({
      include: ['**/*.js']
    }));
    actual.each(function(file) {
      expect(fs.lstatSync(file).isFile()).to.be.true;
    }).done(done);
  });

  function testOptions(options) {
    // provide sensible default options that make sense for these tests
    options.path = options.path || fixturePath;
    return options;
  }

  function endsWith(str, text) {
    if (text.length > str.length) {
      return false;
    }
    return str.indexOf(text) === (str.length - text.length)
  }
});
