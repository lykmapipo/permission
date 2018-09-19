'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { Permission } = require(path.join(__dirname, '..', '..'));

describe('Permission Put', function () {

  before((done) => {
    Permission.deleteMany(done);
  });

  describe('static put', function () {

    let permission = Permission.fake();

    before((done) => {
      permission.post((error, created) => {
        permission = created;
        done(error, created);
      });
    });

    it('should be able to put', (done) => {
      permission = permission.fakeOnly('description');
      Permission.put(permission._id, permission, (error, updated) => {
        expect(error).to.not.exist;
        expect(updated).to.exist;
        expect(updated._id).to.eql(permission._id);
        expect(updated.wildcard).to.eql(permission.wildcard);
        done(error, updated);
      });
    });

    it('should throw if not exists', (done) => {
      const fake = Permission.fake();
      Permission.put(fake._id, fake, (error, updated) => {
        expect(error).to.exist;
        expect(error.status).to.exist;
        expect(error.message).to.be.equal('Not Found');
        expect(updated).to.not.exist;
        done();
      });
    });

  });

  describe('instance put', function () {

    let permission = Permission.fake();

    before((done) => {
      permission.post((error, created) => {
        permission = created;
        done(error, created);
      });
    });

    it('should be able to put', (done) => {
      permission = permission.fakeOnly('description');
      permission.put((error, updated) => {
        expect(error).to.not.exist;
        expect(updated).to.exist;
        expect(updated._id).to.eql(permission._id);
        expect(updated.wildcard).to.eql(permission.wildcard);
        done(error, updated);
      });
    });

    it('should throw if not exists', (done) => {
      permission.put((error, updated) => {
        expect(error).to.not.exist;
        expect(updated).to.exist;
        expect(updated._id).to.eql(permission._id);
        done();
      });
    });

  });

  after((done) => {
    Permission.deleteMany(done);
  });

});
