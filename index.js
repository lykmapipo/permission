'use strict';


/**
 * @module Permission
 * @name Permission
 * @description An entity that defines permits(access rights) that are
 * assignable to role(s) to control what role(s) can see and do
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @licence MIT
 * @since  0.1.0
 * @version 0.2.0
 * @example
 *
 * const { app } = require('@lykmapipo/permission');
 * app.start();
 *
 */


/* dependencies */
const path = require('path');
const _ = require('lodash');
const app = require('@lykmapipo/express-common');
const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);


/* declarations */
const pkg = require(path.join(__dirname, 'package.json'));
const fields = [
  'name',
  'description',
  'version',
  'license',
  'homepage',
  'repository',
  'bugs',
  'sandbox',
  'contributors'
];


/* extract information from package.json */
const info = _.merge({}, _.pick(pkg, fields));


/* export package(module) info */
exports.info = info;


/* import models */
const Permission = require(path.join(__dirname, 'lib', 'permission.model'));


/* export models */
exports.Permission = Permission;


/* import routers */
const permissionRouter =
  require(path.join(__dirname, 'lib', 'permission.http.router'));


/* export party router */
exports.router = exports.permissionRouter = permissionRouter;


/* export app */
Object.defineProperty(exports, 'app', {
  get() {
    /* @todo bind oauth middlewares authenticate, token, authorize */
    app.mount(permissionRouter);
    return app;
  }
});
