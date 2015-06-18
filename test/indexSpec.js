var fs = require('fs');
var path = require('path');
var join = path.join;
var fixturePath = join(__dirname, 'fixtures');
var _ = require('highland');
var expect = require('chai').expect;
var requirePath = require('../lib/index.js');

describe("index", function() {

  var options = {
    path: fixturePath,
    include: ['**/*.js', '**/*.json'],
    exclude: ['**/*Spec.js']
  }

  it('returns a promise that resolves to an object', function(done) {
    requirePath(options)
      .then(function(modules) {
        expect(modules).to.be.an('object');
      })
      .then(done)
      .catch(done);
  });

  it("maps files to their require()'d module", function(done) {
    requirePath(options)
      .then(function(modules) {
        expect(modules['a.js']).to.equal(require('./fixtures/a.js'));
      })
      .then(done)
      .catch(done);
  });

  it('full integration test', function(done) {
    requirePath(options)
      .then(function(modules) {
        expect(modules['a.js']).to.equal(require('./fixtures/a.js'));
        expect(modules['aSpec.js']).to.be.undefined;
        expect(modules['b.json']).to.equal(require('./fixtures/b.json'));
        expect(modules['c.junk']).to.be.undefined;
        expect(modules['dir1/inner.js']).to.equal(require('./fixtures/dir1/inner.js'));
      })
      .then(done)
      .catch(done);
  });


});
