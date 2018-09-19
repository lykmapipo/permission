'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');
const Permission =
  require(path.join(__dirname, '..', '..', 'lib', 'permission.model'));


describe('Permission Model', () => {

  describe('Validations', () => {
    //TODO
  });

  describe('Hooks', () => {
    //TODO
  });

  describe('Instance', () => {

    it('`preValidate` should be a function', () => {
      const permission = Permission.fake();
      expect(permission.preValidate).to.exist;
      expect(permission.preValidate).to.be.a('function');
      expect(permission.preValidate.length).to.be.equal(1);
      expect(permission.preValidate.name).to.be.equal('preValidate');
    });

  });

  describe('Statics', () => {

    it('should expose model name as constant', () => {
      expect(Permission.MODEL_NAME).to.exist;
      expect(Permission.MODEL_NAME).to.be.equal('Permission');
    });

    it('should expose collection name as constant', () => {
      expect(Permission.COLLECTION_NAME).to.exist;
      expect(Permission.COLLECTION_NAME).to.be.equal('permissions');
    });

  });

});
