'use strict';


/* dependencies */
const path = require('path');
const _ = require('lodash');
const { expect } = require('chai');
const { Permission } = require(path.join(__dirname, '..', '..'));

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
    const seed = 'Post';
    Permission.seed(seed, (error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      expect(_.find(seeded, { resource: seed })).to.exist;
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

  it('should seed provided', (done) => {
    const seed = 'Post';
    const _seed = { resource: 'Permission', action: 'purge' };
    Permission.seed([seed, _seed], (error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      expect(_.find(seeded, { resource: seed })).to.exist;
      expect(_.find(seeded, _seed)).to.exist;
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

  it('should seed .env resources', (done) => {
    process.env.PERMISSION_SEED_RESOURCES = 'Activity,Task';
    Permission.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      expect(_.find(seeded, { resource: 'Activity' })).to.exist;
      expect(_.find(seeded, { resource: 'Task' })).to.exist;
      done(error, seeded);
    });
  });

  it('should ignore seed', (done) => {
    process.env.PERMISSION_SEED_RESOURCES = 'Activity,Task';
    process.env.PERMISSION_SEED_IGNORE = 'Task';
    Permission.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      expect(_.find(seeded, { resource: 'Activity' })).to.exist;
      expect(_.find(seeded, { resource: 'Task' })).to.not.exist;
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
