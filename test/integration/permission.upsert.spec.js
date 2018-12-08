'use strict';


/* dependencies */
const faker = require('@benmaruchu/faker');
const { expect } = require('chai');
const { include } = require('@lykmapipo/include');
const { Permission } = include(__dirname, '..', '..');


describe('Permission Upsert', () => {

  before((done) => {
    Permission.deleteMany(done);
  });

  let permission;

  beforeEach((done) => {
    permission = Permission.fakeExcept('icon');
    permission.post((error, created) => {
      permission = created;
      done(error, created);
    });
  });

  it('should be able upsert non existing', (done) => {
    Permission.upsert(permission, (error, upserted) => {
      expect(error).to.not.exist;
      expect(upserted).to.exist;
      expect(upserted._id).to.be.eql(permission._id);
      expect(upserted.wildcard).to.be.eql(permission.wildcard);
      done(error, upserted);
    });
  });

  it('should be able upsert existing by _id', (done) => {
    const updates = {
      _id: permission._id,
      description: faker.lorem.sentence()
    };
    Permission.upsert(updates, (error, upserted) => {
      expect(error).to.not.exist;
      expect(upserted).to.exist;
      expect(upserted._id).to.be.eql(permission._id);
      expect(upserted.wildcard).to.be.eql(permission.wildcard);
      expect(upserted.description).to.not.be.eql(permission.description);
      expect(upserted.description).to.be.eql(updates.description);
      expect(upserted.createdAt).to.be.eql(permission.createdAt);
      done(error, upserted);
    });
  });

  it('should be able upsert existing by fields', (done) => {
    const updates = {
      wildcard: permission.wildcard,
      description: faker.lorem.sentence()
    };
    Permission.upsert(updates, (error, upserted) => {
      expect(error).to.not.exist;
      expect(upserted).to.exist;
      expect(upserted._id).to.be.eql(permission._id);
      expect(upserted.wildcard).to.be.eql(permission.wildcard);
      expect(upserted.description).to.not.be.eql(permission.description);
      expect(upserted.description).to.be.eql(updates.description);
      expect(upserted.createdAt).to.be.eql(permission.createdAt);
      done(error, upserted);
    });
  });

  after((done) => {
    Permission.deleteMany(done);
  });

});
