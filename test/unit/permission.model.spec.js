'use strict';


/* dependencies */
const _ = require('lodash');
const { expect } = require('chai');
const { include } = require('@lykmapipo/include');
const Permission = include(__dirname, '..', '..', 'lib', 'permission.model');


describe('Permission Instance', () => {

  it('should have pre validate logics', () => {
    const permission = Permission.fake();
    expect(permission.preValidate).to.exist;
    expect(permission.preValidate).to.be.a('function');
    expect(permission.preValidate.length).to.be.equal(1);
    expect(permission.preValidate.name).to.be.equal('preValidate');
  });

  it('should set wildcard on pre validate', (done) => {
    const permission = Permission.fake();

    expect(permission.wildcard).to.not.exist;
    permission.preValidate((error) => {
      expect(permission.wildcard).to.exist;
      done(error);
    });
  });

});

describe('Permission Validations', () => {

  it('should throw if no resource', (done) => {
    const permission = Permission.fakeOnly('action');
    permission.validate((error) => {
      expect(error).to.exist;
      expect(error.name).to.equal('ValidationError');
      expect(error.errors.resource).to.exist;
      expect(error.errors.resource.name)
        .to.be.equal('ValidatorError');
      done();
    });
  });

  it('should throw if empty resource', (done) => {
    const permission = Permission.fake();
    permission.resource = '';

    permission.validate((error) => {
      expect(error).to.exist;
      expect(error.name).to.equal('ValidationError');
      expect(error.errors.resource).to.exist;
      expect(error.errors.resource.name)
        .to.be.equal('ValidatorError');
      done();
    });
  });

  it('should throw if no action', (done) => {
    const permission = Permission.fakeOnly('resource');
    permission.validate((error) => {
      expect(error).to.exist;
      expect(error.name).to.equal('ValidationError');
      expect(error.errors.action).to.exist;
      expect(error.errors.action.name)
        .to.be.equal('ValidatorError');
      done();
    });
  });

  it('should throw if empty action', (done) => {
    const permission = Permission.fake();
    permission.action = '';

    permission.validate((error) => {
      expect(error).to.exist;
      expect(error.name).to.equal('ValidationError');
      expect(error.errors.action).to.exist;
      expect(error.errors.action.name)
        .to.be.equal('ValidatorError');
      done();
    });
  });

});

describe('Permission Statics', () => {

  it('should expose model name', () => {
    expect(Permission.MODEL_NAME).to.exist;
    expect(Permission.MODEL_NAME).to.be.equal('Permission');
  });

  it('should expose collection name', () => {
    expect(Permission.COLLECTION_NAME).to.exist;
    expect(Permission.COLLECTION_NAME).to.be.equal('permissions');
  });

  it('should expose default actions', () => {
    expect(Permission.DEFAULT_ACTIONS).to.exist;
    expect(Permission.DEFAULT_ACTIONS).to.be.eql([
      'Create', 'View', 'Edit',
      'Delete', 'Share', 'Print',
      'Import', 'Export', 'Download'
    ]);
  });

  it('should expose autopopulate options', () => {
    expect(Permission.OPTION_AUTOPOPULATE).to.exist;
    expect(Permission.OPTION_AUTOPOPULATE).to.be.eql({
      select: { resource: 1, action: 1, wildcard: 1 },
      maxDepth: 1
    });
  });

  it('should prepare seeding criteria', () => {
    const seed = Permission.fake().toObject();

    const withId = Permission.prepareSeedCriteria(seed);
    expect(withId).to.exist;
    expect(withId._id).to.exist;
    expect(withId.resource).to.not.exist;
    expect(withId.action).to.not.exist;
    expect(withId.wildcard).to.not.exist;

    const withProps = Permission.prepareSeedCriteria(_.omit(seed, '_id'));
    expect(withProps).to.exist;
    expect(withProps._id).to.not.exist;
    expect(withProps.resource).to.exist;
    expect(withProps.action).to.exist;
  });

});
