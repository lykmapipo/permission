'use strict';


/* dependencies */
const { expect } = require('@lykmapipo/mongoose-test-helpers');
const { Permission } = require('../..');


describe('Permission Static Post', () => {

  before((done) => {
    Permission.deleteMany(done);
  });

  let permission = Permission.fake();

  it('should be able to post', (done) => {
    Permission.post(permission, (error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.eql(permission._id);
      expect(created.description).to.eql(permission.description);
      done(error, created);
    });
  });

  after((done) => {
    Permission.deleteMany(done);
  });

});

describe('Permission Instance Post', () => {

  before((done) => {
    Permission.deleteMany(done);
  });

  let permission = Permission.fake();

  it('should be able to post', (done) => {
    permission.post((error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.eql(permission._id);
      expect(created.description).to.eql(permission.description);
      done(error, created);
    });
  });

  after((done) => {
    Permission.deleteMany(done);
  });

});
