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
const _ = require('lodash');
const { include } = require('@lykmapipo/include');
const app = require('@lykmapipo/express-common');
const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);


/* includes */
const pkg = include(__dirname, 'package.json');
const Permission = include(__dirname, 'lib', 'permission.model');
const permissionRouter = include(__dirname, 'lib', 'permission.http.router');


/**
 * @name info
 * @description package information
 * @type {Object}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
exports.info = _.merge({}, _.pick(pkg, [
  'name', 'description', 'version', 'license',
  'homepage', 'repository', 'bugs', 'sandbox', 'contributors'
]));


/**
 * @name Permission
 * @description Permission model
 * @type {mongoose.Model}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
exports.Permission = Permission;


/**
 * @name permissionRouter
 * @description permission http router
 * @type {express.Router}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
exports.permissionRouter = permissionRouter;


/**
 * @name apiVersion
 * @description http router api version
 * @type {String}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
exports.apiVersion = permissionRouter.apiVersion;


/**
 * @name app
 * @description express app
 * @type {Object}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
Object.defineProperty(exports, 'app', {
  get() {
    /* @todo bind oauth middlewares authenticate, token, authorize */
    app.mount(permissionRouter);
    return app;
  }
});
