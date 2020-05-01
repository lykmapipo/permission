'use strict';


/* dependencies */
const _ = require('lodash');
const { expect } = require('@lykmapipo/mongoose-test-helpers');
const { Permission } = require('../..');


describe('Permission getById', () => {

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

  it('should be able to get an instance', (done) => {
    Permission.getById(permission._id, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(permission._id);
      done(error, found);
    });
  });

  it('should be able to get with options', (done) => {
    const options = {
      _id: permission._id,
      select: 'wildcard'
    };

    Permission.getById(options, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(permission._id);
      expect(found.wildcard).to.exist;

      //...assert selection
      const fields = _.keys(found.toObject());
      expect(fields).to.have.length(2);
      _.map([
        'resource',
        'description',
        'createdAt',
        'updatedAt'
      ], function (field) {
        expect(fields).to.not.include(field);
      });
      done(error, found);
    });

  });

  it('should throw if not exists', (done) => {
    const permission = Permission.fake();
    Permission.getById(permission._id, (error, found) => {
      expect(error).to.exist;
      // expect(error.status).to.exist;
      expect(error.name).to.be.equal('DocumentNotFoundError');
      expect(found).to.not.exist;
      done();
    });
  });

  after((done) => {
    Permission.deleteMany(done);
  });

});
