'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { Permission } = require(path.join(__dirname, '..', '..'));

describe('Permission Post', () => {

  before((done) => {
    Permission.deleteMany(done);
  });

  describe('static post', () => {

    let permission = Permission.fake();

    it('should be able to post', (done) => {
      Permission.post(permission, (error, created) => {
        expect(error).to.not.exist;
        expect(created).to.exist;
        expect(created._id).to.eql(permission._id);
        expect(created.wildcard).to.exist;
        done(error, created);
      });
    });

  });

  describe('instance post', () => {

    let permission = Permission.fake();

    it('should be able to post', (done) => {
      permission.post((error, created) => {
        expect(error).to.not.exist;
        expect(created).to.exist;
        expect(created._id).to.eql(permission._id);
        expect(created.wildcard).to.exist;
        done(error, created);
      });
    });

  });

  after((done) => {
    Permission.deleteMany(done);
  });

});
