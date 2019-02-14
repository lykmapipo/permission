'use strict';


/* dependencies */
const { expect } = require('chai');
const { include } = require('@lykmapipo/include');
const request = require('supertest');
const { Permission, apiVersion, app } = include(__dirname, '..', '..');


describe('Permission Rest API', function () {

  let permission;

  before((done) => {
    Permission.deleteMany(done);
  });

  before((done) => {
    permission = Permission.fake();
    permission.post((error, created) => {
      permission = created;
      done(error, created);
    });
  });

  it('should handle HTTP GET on /permissions', (done) => {
    request(app)
      .get(`/${apiVersion}/permissions`)
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        //assert payload
        const result = response.body;
        expect(result.data).to.exist;
        expect(result.total).to.exist;
        expect(result.limit).to.exist;
        expect(result.skip).to.exist;
        expect(result.page).to.exist;
        expect(result.pages).to.exist;
        expect(result.lastModified).to.exist;
        done(error, response);
      });
  });

  it('should handle HTTP GET on /permissions/id:', (done) => {
    request(app)
      .get(`/${apiVersion}/permissions/${permission._id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const found = new Permission(response.body);

        expect(found._id).to.exist;
        expect(found._id).to.be.eql(permission._id);
        expect(found.wildcard).to.be.equal(permission.wildcard);

        done(error, response);
      });
  });

  it('should handle HTTP PATCH on /permissions/id:', (done) => {
    const { name } = permission.fakeOnly('name');
    request(app)
      .patch(`/${apiVersion}/permissions/${permission._id}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ name })
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const patched = new Permission(response.body);

        expect(patched._id).to.exist;
        expect(patched._id).to.be.eql(permission._id);
        expect(patched.wildcard).to.be.equal(permission.wildcard);

        //set
        permission = patched;

        done(error, response);
      });
  });

  it('should handle HTTP PUT on /permissions/id:', (done) => {
    const { name } = permission.fakeOnly('name');
    request(app)
      .put(`/${apiVersion}/permissions/${permission._id}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ name })
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const updated = new Permission(response.body);

        expect(updated._id).to.exist;
        expect(updated._id).to.be.eql(permission._id);
        expect(updated.wildcard).to.be.equal(permission.wildcard);

        //set
        permission = updated;

        done(error, response);
      });
  });

  after((done) => {
    Permission.deleteMany(done);
  });

});
