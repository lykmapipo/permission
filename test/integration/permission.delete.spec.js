'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { Permission } = require(path.join(__dirname, '..', '..'));

describe('Permission Delete', () => {

  before((done) => {
    Permission.deleteMany(done);
  });

  describe('static delete', () => {
    let permission;

    before((done) => {
      permission = Permission.fake();
      permission.post((error, created) => {
        permission = created;
        done(error, created);
      });
    });

    it('should be able to delete', (done) => {
      Permission.del(permission._id, function (error, deleted) {
        expect(error).to.not.exist;
        expect(deleted).to.exist;
        expect(deleted._id).to.eql(permission._id);
        done(error, deleted);
      });
    });

    it('should throw if not exists', (done) => {
      Permission
        .del(permission._id, function (error, deleted) {
          expect(error).to.exist;
          expect(error.status).to.exist;
          expect(error.message).to.be.equal('Not Found');
          expect(deleted).to.not.exist;
          done();
        });
    });

  });

  describe('instance delete', () => {
    let permission;

    before((done) => {
      permission = Permission.fake();
      permission.post((error, created) => {
        permission = created;
        done(error, created);
      });
    });

    it('should be able to delete', (done) => {
      permission.del(function (error, deleted) {
        expect(error).to.not.exist;
        expect(deleted).to.exist;
        expect(deleted._id).to.eql(permission._id);
        done(error, deleted);
      });
    });

    it('should throw if not exists', (done) => {
      permission.del(function (error, deleted) {
        expect(error).to.not.exist;
        expect(deleted).to.exist;
        expect(deleted._id).to.eql(permission._id);
        done();
      });
    });

  });

  after((done) => {
    Permission.deleteMany(done);
  });

});
