'use strict';


/* dependencies */
const path = require('path');
const request = require('supertest');
const { expect } = require('chai');
const {
  Permission,
  permissionRouter,
  app
} = require(path.join(__dirname, '..', '..'));

describe('Permission HTTP Spec', () => {

  before((done) => {
    Permission.deleteMany(done);
  });

  let permission = Permission.fake();

  before((done) => {
    permission.post((error, created) => {
      permission = created;
      done(error, created);
    });
  });

  it('should handle HTTP GET on /permissions', (done) => {
    request(app)
      .get(`/v${permissionRouter.apiVersion}/permissions`)
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

  it('should handle HTTP GET on /permissions/:id', (done) => {
    request(app)
      .get(
        `/v${permissionRouter.apiVersion}/permissions/${permission._id}`
      )
      .set('Accept', 'application/json')
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const found = response.body;
        expect(found._id).to.exist;
        expect(found._id).to.be.eql(permission._id.toString());
        expect(found.resource).to.be.eql(permission.resource);
        expect(found.action).to.be.eql(permission.action);
        expect(found.description).to.be.eql(permission.description);
        expect(found.wildcard).to.be.eql(permission.wildcard);

        done(error, response);
      });
  });

  it('should handle HTTP PATCH on /permissions/:id', (done) => {
    const patch = permission.fakeOnly('description');
    request(app)
      .patch(
        `/v${permissionRouter.apiVersion}/permissions/${permission._id}`
      )
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(patch)
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const updated = response.body;

        expect(updated._id).to.exist;
        expect(updated._id).to.be.eql(permission._id.toString());
        expect(updated.resource).to.be.eql(permission.resource);
        expect(updated.action).to.be.eql(permission.action);
        expect(updated.wildcard).to.be.eql(permission.wildcard);

        done(error, response);
      });
  });

  it('should handle HTTP PUT on /permissions/:id', (done) => {
    const put = permission.fakeOnly('description');
    request(app)
      .put(
        `/v${permissionRouter.apiVersion}/permissions/${permission._id}`
      )
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(put)
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const updated = response.body;

        expect(updated._id).to.exist;
        expect(updated._id).to.be.eql(permission._id.toString());
        expect(updated.resource).to.be.eql(permission.resource);
        expect(updated.action).to.be.eql(permission.action);
        expect(updated.wildcard).to.be.eql(permission.wildcard);
        done(error, response);

      });

  });

  after((done) => {
    Permission.deleteMany(done);
  });

});
