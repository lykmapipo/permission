'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');
const Permission =
  require(path.join(__dirname, '..', '..', 'lib', 'permission.model'));


describe('Permission Schema', () => {

  it('should have resource field', () => {

    const resource = Permission.schema.tree.resource;
    const instance = Permission.schema.paths.resource.instance;

    expect(instance).to.be.equal('String');
    expect(resource).to.exist;
    expect(resource).to.be.an('object');
    expect(resource.type).to.be.a('function');
    expect(resource.type.name).to.be.equal('String');
    expect(resource.required).to.be.true;
    expect(resource.trim).to.be.true;
    expect(resource.searchable).to.be.true;
    expect(resource.index).to.be.true;

  });

  it('should have action field', () => {

    const action = Permission.schema.tree.action;
    const instance = Permission.schema.paths.action.instance;

    expect(instance).to.be.equal('String');
    expect(action).to.exist;
    expect(action).to.be.an('object');
    expect(action.type).to.be.a('function');
    expect(action.type.name).to.be.equal('String');
    expect(action.required).to.be.true;
    expect(action.trim).to.be.true;
    expect(action.lowercase).to.be.true;
    expect(action.searchable).to.be.true;
    expect(action.index).to.be.true;

  });

  it('should have description field', () => {

    const description = Permission.schema.tree.description;
    const instance = Permission.schema.paths.description.instance;

    expect(instance).to.be.equal('String');
    expect(description).to.exist;
    expect(description).to.be.an('object');
    expect(description.type).to.be.a('function');
    expect(description.type.name).to.be.equal('String');
    expect(description.trim).to.be.true;
    expect(description.searchable).to.be.true;
    expect(description.index).to.be.true;

  });

  it('should have wildcard field', () => {

    const wildcard = Permission.schema.tree.wildcard;
    const instance = Permission.schema.paths.wildcard.instance;

    expect(instance).to.be.equal('String');
    expect(wildcard).to.exist;
    expect(wildcard).to.be.an('object');
    expect(wildcard.type).to.be.a('function');
    expect(wildcard.type.name).to.be.equal('String');
    expect(wildcard.required).to.be.true;
    expect(wildcard.trim).to.be.true;
    expect(wildcard.lowercase).to.be.true;
    expect(wildcard.searchable).to.be.true;
    expect(wildcard.index).to.be.true;

  });

});
