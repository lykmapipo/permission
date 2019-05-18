'use strict';


/* dependencies */
const { expect } = require('@lykmapipo/mongoose-test-helpers');
const { include } = require('@lykmapipo/include');
const { SchemaTypes } = require('@lykmapipo/mongoose-common');
const Permission = include(__dirname, '..', '..', 'lib', 'permission.model');


describe('Permission Schema', () => {

  it('should have resource field', () => {
    const resource = Permission.path('resource');

    expect(resource).to.exist;
    expect(resource).to.be.instanceof(SchemaTypes.String);
    expect(resource.options).to.exist;
    expect(resource.options).to.be.an('object');
    expect(resource.options.type).to.exist;
    expect(resource.options.trim).to.be.true;
    expect(resource.options.minlength).to.be.equal(1);
    expect(resource.options.required).to.be.true;
    expect(resource.options.index).to.be.true;
    expect(resource.options.searchable).to.be.true;
    expect(resource.options.fake).to.exist;
  });

  it('should have action field', () => {
    const action = Permission.path('action');

    expect(action).to.exist;
    expect(action).to.be.instanceof(SchemaTypes.String);
    expect(action.options).to.exist;
    expect(action.options).to.be.an('object');
    expect(action.options.type).to.exist;
    expect(action.options.required).to.be.true;
    expect(action.options.trim).to.be.true;
    expect(action.options.minlength).to.be.equal(1);
    expect(action.options.lowercase).to.be.true;
    expect(action.options.index).to.be.true;
    expect(action.options.searchable).to.be.true;
    expect(action.options.fake).to.exist;
  });

  it('should have description field', () => {
    const description = Permission.path('description');

    expect(description).to.exist;
    expect(description).to.be.instanceof(SchemaTypes.String);
    expect(description.options).to.exist;
    expect(description.options).to.be.an('object');
    expect(description.options.type).to.exist;
    expect(description.options.trim).to.be.true;
    expect(description.options.index).to.be.true;
    expect(description.options.searchable).to.be.true;
    expect(description.options.fake).to.exist;
  });

  it('should have wildcard field', () => {
    const wildcard = Permission.path('wildcard');

    expect(wildcard).to.exist;
    expect(wildcard).to.be.instanceof(SchemaTypes.String);
    expect(wildcard.options).to.exist;
    expect(wildcard.options).to.be.an('object');
    expect(wildcard.options.type).to.exist;
    expect(wildcard.options.required).to.be.true;
    expect(wildcard.options.trim).to.be.true;
    expect(wildcard.options.lowercase).to.be.true;
    expect(wildcard.options.index).to.be.true;
    expect(wildcard.options.unique).to.be.true;
    expect(wildcard.options.searchable).to.be.true;
  });

});
