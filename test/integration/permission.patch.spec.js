'use strict';

/* dependencies */
const _ = require('lodash');
const { expect } = require('@lykmapipo/mongoose-test-helpers');
const { Permission } = require('../..');

describe('Permission Static Patch', () => {
  before((done) => {
    Permission.deleteMany(done);
  });

  let permission = Permission.fake();

  before((done) => {
    permission.post((error, created) => {
      permission = created;
      done(error, created);
    });
  });

  it('should be able to patch', (done) => {
    permission = permission.fakeOnly('description');
    Permission.patch(permission._id, permission, (error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(permission._id);
      expect(updated.wildcard).to.eql(permission.wildcard);
      done(error, updated);
    });
  });

  it('should throw if not exists', (done) => {
    const fake = Permission.fake().toObject();
    Permission.patch(fake._id, _.omit(fake, '_id'), (error, updated) => {
      expect(error).to.exist;
      // expect(error.status).to.exist;
      expect(error.name).to.be.equal('DocumentNotFoundError');
      expect(updated).to.not.exist;
      done();
    });
  });

  after((done) => {
    Permission.deleteMany(done);
  });
});

describe('Permission Instance Patch', () => {
  before((done) => {
    Permission.deleteMany(done);
  });

  let permission = Permission.fake();

  before((done) => {
    permission.post((error, created) => {
      permission = created;
      done(error, created);
    });
  });

  it('should be able to patch', (done) => {
    permission = permission.fakeOnly('description');
    permission.patch((error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(permission._id);
      expect(updated.wildcard).to.eql(permission.wildcard);
      done(error, updated);
    });
  });

  it('should throw if not exists', (done) => {
    permission.patch((error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(permission._id);
      done();
    });
  });

  after((done) => {
    Permission.deleteMany(done);
  });
});
