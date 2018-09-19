'use strict';


/* dependencies */
const path = require('path');
const _ = require('lodash');
const async = require('async');
const { expect } = require('chai');
const { Permission } = require(path.join(__dirname, '..', '..'));

describe('Permission Get', () => {

  before((done) => {
    Permission.deleteMany(done);
  });

  let permissions = Permission.fake(10);

  before((done) => {
    permissions = _.map(permissions, (permission) => {
      return (next) => {
        permission.post(next);
      };
    });

    async.parallel(permissions, (error, created) => {
      permissions = created;
      done(error, created);
    });

  });

  it('should be able to get without options', (done) => {
    Permission.get((error, results) => {
      expect(error).to.not.exist;
      expect(results).to.exist;
      expect(results.data).to.exist;
      expect(results.data).to.have.length(10);
      expect(results.total).to.exist;
      expect(results.total).to.be.equal(10);
      expect(results.limit).to.exist;
      expect(results.limit).to.be.equal(10);
      expect(results.skip).to.exist;
      expect(results.skip).to.be.equal(0);
      expect(results.page).to.exist;
      expect(results.page).to.be.equal(1);
      expect(results.pages).to.exist;
      expect(results.pages).to.be.equal(1);
      expect(results.lastModified).to.exist;
      done(error, results);
    });
  });

  it('should be able to get with options', (done) => {
    const options = { page: 1, limit: 20 };
    Permission.get(options, (error, results) => {
      expect(error).to.not.exist;
      expect(results).to.exist;
      expect(results.data).to.exist;
      expect(results.data).to.have.length(10);
      expect(results.total).to.exist;
      expect(results.total).to.be.equal(10);
      expect(results.limit).to.exist;
      expect(results.limit).to.be.equal(20);
      expect(results.skip).to.exist;
      expect(results.skip).to.be.equal(0);
      expect(results.page).to.exist;
      expect(results.page).to.be.equal(1);
      expect(results.pages).to.exist;
      expect(results.pages).to.be.equal(1);
      expect(results.lastModified).to.exist;
      done(error, results);
    });
  });


  it('should be able to search with options', (done) => {
    const options = { filter: { q: permissions[0].wildcard } };
    Permission.get(options, (error, results) => {
      expect(error).to.not.exist;
      expect(results).to.exist;
      expect(results.data).to.exist;
      expect(results.data).to.have.length.of.at.least(1);
      expect(results.total).to.exist;
      expect(results.total).to.be.at.least(1);
      expect(results.limit).to.exist;
      expect(results.limit).to.be.equal(10);
      expect(results.skip).to.exist;
      expect(results.skip).to.be.equal(0);
      expect(results.page).to.exist;
      expect(results.page).to.be.equal(1);
      expect(results.pages).to.exist;
      expect(results.pages).to.be.equal(1);
      expect(results.lastModified).to.exist;
      done(error, results);
    });
  });


  it('should parse filter options', (done) => {
    const options = { filter: { wildcard: permissions[0].wildcard } };
    Permission.get(options, (error, results) => {
      expect(error).to.not.exist;
      expect(results).to.exist;
      expect(results.data).to.exist;
      expect(results.data).to.have.length.of.at.least(1);
      expect(results.total).to.exist;
      expect(results.total).to.be.at.least(1);
      expect(results.limit).to.exist;
      expect(results.limit).to.be.equal(10);
      expect(results.skip).to.exist;
      expect(results.skip).to.be.equal(0);
      expect(results.page).to.exist;
      expect(results.page).to.be.equal(1);
      expect(results.pages).to.exist;
      expect(results.pages).to.be.equal(1);
      expect(results.lastModified).to.exist;
      done(error, results);
    });

  });

  after((done) => {
    Permission.deleteMany(done);
  });

});
