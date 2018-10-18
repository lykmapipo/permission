'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');
const Permission =
  require(path.join(__dirname, '..', '..', 'lib', 'permission.model'));


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

  it('should expose model name as constant', () => {
    expect(Permission.MODEL_NAME).to.exist;
    expect(Permission.MODEL_NAME).to.be.equal('Permission');
  });

  it('should expose collection name as constant', () => {
    expect(Permission.COLLECTION_NAME).to.exist;
    expect(Permission.COLLECTION_NAME).to.be.equal('permissions');
  });

  it('should expose default actions as constant', () => {
    expect(Permission.DEFAULT_ACTIONS).to.exist;
    expect(Permission.DEFAULT_ACTIONS).to.be.eql([
      'Create', 'View', 'Edit',
      'Delete', 'Share', 'Print',
      'Import', 'Export', 'Download'
    ]);
  });

});
