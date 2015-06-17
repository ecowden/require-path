var expect = require('chai').expect;

describe("index", function () {

  it("exists", function () {
    var index = require('../lib/index');
    expect(index).to.be.a.function;
  });

});
