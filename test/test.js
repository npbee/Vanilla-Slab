var chai = require('chai');
var expect = chai.expect;

describe('fake test suite', function() {
  it('has 2 equal to be greater than 0', function() {
    expect(2).to.be.above(0);
  });
});
