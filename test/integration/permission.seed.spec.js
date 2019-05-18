'use strict';


/* dependencies */
const path = require('path');
const _ = require('lodash');
const { expect } = require('@lykmapipo/mongoose-test-helpers');
const { include } = require('@lykmapipo/include');
const { Permission } = include(__dirname, '..', '..');


describe('Permission Seed', () => {

  const SEEDS_PATH = process.env.SEEDS_PATH;
  let permissions = [];

  before((done) => {
    Permission.deleteMany(done);
  });

  before(() => {
    process.env.SEEDS_PATH = path.join(__dirname, '..', 'fixtures');
  });

  it('should be able to seed', (done) => {
    Permission.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      permissions = seeded;
      done(error, seeded);
    });
  });

  it('should not throw if seed exist', (done) => {
    Permission.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      done(error, seeded);
    });
  });

  it('should seed provided', (done) => {
    const seed = { resource: 'Permission', action: 'purge' };
    Permission.seed(seed, (error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      expect(_.find(seeded, seed)).to.exist;
      done(error, seeded);
    });
  });

  it('should seed provided', (done) => {
    const seed = { resource: 'Permission', action: 'purge' };
    Permission.seed([seed], (error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      expect(_.find(seeded, seed)).to.exist;
      done(error, seeded);
    });
  });

  it('should not throw if provided exist', (done) => {
    const seed = { resource: 'Permission', action: 'purge' };
    Permission.seed(seed, (error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      expect(_.find(seeded, seed)).to.exist;
      done(error, seeded);
    });
  });

  it('should be able to seed from environment', (done) => {
    Permission.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      expect(_.find(seeded, { resource: 'Order' })).to.exist;
      done(error, seeded);
    });
  });

  it('should not throw if seed from environment exist', (done) => {
    Permission.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      expect(_.find(seeded, { resource: 'Order' })).to.exist;
      done(error, seeded);
    });
  });

  after((done) => {
    Permission.deleteMany(done);
  });

  after(() => {
    process.env.SEEDS_PATH = SEEDS_PATH;
  });

});
