'use strict';


/* dependencies */
const { include } = require('@lykmapipo/include');
const {
  clear: clearHttp,
  expect,
  testRouter,
} = require('@lykmapipo/express-test-helpers');
const { permissionRouter, Permission } = include(__dirname, '..', '..');


describe('Permission Rest API', function () {

  let permission;

  before(() => clearHttp());

  before(done => {
    Permission.deleteMany(done);
  });

  before(done => {
    permission = Permission.fake();
    permission.post((error, created) => {
      permission = created;
      done(error, created);
    });
  });

  it('should handle HTTP POST on /permissions', done => {
    const { testPost } = testRouter('permissions', permissionRouter);
    testPost(permission.toObject())
      .expect(404)
      .end((error, response) => {
        done(null, response);
      });
  });

  it('should handle HTTP GET on /permissions', done => {
    const { testGet } = testRouter('permissions', permissionRouter);
    testGet()
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

  it('should handle HTTP GET on /permissions/id:', done => {
    const { testGet } = testRouter('permissions', permissionRouter);
    testGet(permission._id.toString())
      .expect(200)
      .expect('Content-Type', /json/)
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

  it('should handle HTTP PATCH on /permissions/id:', done => {
    const { testPatch } = testRouter('permissions', permissionRouter);
    const { name } = permission.fakeOnly('name');
    testPatch(permission._id.toString(), { name })
      .expect(200)
      .expect('Content-Type', /json/)
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

  it('should handle HTTP PUT on /permissions/id:', done => {
    const { testPut } = testRouter('permissions', permissionRouter);
    const { name } = permission.fakeOnly('name');
    testPut(permission._id.toString(), { name })
      .expect(200)
      .expect('Content-Type', /json/)
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

  it('should handle HTTP DELETE on /permissions/id:', done => {
    const { testDelete } = testRouter('permissions', permissionRouter);
    testDelete(permission._id.toString())
      .expect(405)
      .end((error, response) => {
        done(null, response);
      });
  });

  after(done => {
    Permission.deleteMany(done);
  });

});
