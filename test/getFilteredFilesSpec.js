// var fs = require('fs');
// var path = require('path');
// var join = path.join;
// var fixturePath = join(__dirname, 'fixtures');
// var _ = require('highland');
// var expect = require('chai').expect;
// var getFilteredFiles = require('../lib/getFilteredFiles.js');
//
// describe("index", function() {
//
//   var options = { // api sketch
//     path: fixturePath,
//     include: ['**/*.js', '**/*.json'], // should be default,
//     exclude: ['**/*Spec.js']
//   }
//
//   it('returns a Highland stream', function(done) {
//
//     var actual = scoop(options);
//
//     expect(_.isStream(actual)).to.be.true;
//     actual.done(done);
//   });
//
//
// });
