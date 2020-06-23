'use strict';

/* dependencies */
const { expect } = require('@lykmapipo/mongoose-test-helpers');
const { Permission } = require('../..');

describe('Permission Static Delete', () => {
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

  it('should be able to delete', (done) => {
    Permission.del(permission._id, (error, deleted) => {
      expect(error).to.not.exist;
      expect(deleted).to.exist;
      expect(deleted._id).to.eql(permission._id);
      done(error, deleted);
    });
  });

  it('should throw if not exists', (done) => {
    Permission.del(permission._id, (error, deleted) => {
      expect(error).to.exist;
      // expect(error.status).to.exist;
      expect(error.name).to.be.equal('DocumentNotFoundError');
      expect(deleted).to.not.exist;
      done();
    });
  });

  after((done) => {
    Permission.deleteMany(done);
  });
});

describe('Permission Instance Delete', () => {
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

  it('should be able to delete', (done) => {
    permission.del((error, deleted) => {
      expect(error).to.not.exist;
      expect(deleted).to.exist;
      expect(deleted._id).to.eql(permission._id);
      done(error, deleted);
    });
  });

  it('should throw if not exists', (done) => {
    permission.del((error, deleted) => {
      expect(error).to.not.exist;
      expect(deleted).to.exist;
      expect(deleted._id).to.eql(permission._id);
      done();
    });
  });

  after((done) => {
    Permission.deleteMany(done);
  });
});
