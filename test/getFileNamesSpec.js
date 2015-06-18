var path = require('path');
var _ = require('highland');
var expect = require('chai').expect;
var getFileNames = require('../lib/getFileNames');
describe("getFileNames", function() {

  var absoluteFilename = '/a/b/c/target.js';

  var actual;

  beforeEach(function() {
    actual = getFileNames(_([absoluteFilename]));
  });

  it('returns a Highland stream', function(done) { // WRONG!!!
    expect(_.isStream(actual)).to.be.true;
    actual.done(done);
  });

  it('has the same number of elements as the input stream', function (done) {
    actual.toArray(function(tuples) {
      expect(tuples.length).to.equal(1);
      done();
    });
  });

  it('produces [absoluteFilename : basename] tuples', function(done) { // WRONG!!!
    actual.toArray(function(tuples) {
      var first = tuples[0];
      expect(first[0]).to.equal('target.js');
      expect(first[1]).to.equal(absoluteFilename);
      done();
    });
  });


});
