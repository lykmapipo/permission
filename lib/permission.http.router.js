'use strict';


/**
 * @apiDefine Permission Permission
 *
 * @apiDescription A representation of ability to perform an action or
 * access a resource.
 *
 * It is important to understand a Permission instance only represents
 * functionality or access - it does not grant it.
 *
 * A Permission is the most granular, or atomic, unit in a system's security
 * policy and is the cornerstone upon which fine-grained security models
 * are built.
 *
 * Permissions are immutable and reflect an application's raw functionality
 * (opening files, printing files, creating users, etc). This is what
 * allows a system's security policy to be dynamic: because Permissions
 * represent raw functionality and only change when the application's source
 * code changes, they are immutable at runtime - they represent 'what'
 * the system can do.
 *
 * Granting access to an application functionality or a particular resource
 * is done by the application's security configuration, typically by
 * assigning Permissions to users, roles and/or groups.
 *
 * Most applications do associate a named role with permissions
 * (i.e. a role 'has a' collection of Permissions) and then associate
 * users with roles (i.e. a user 'has a' collection of roles) so that by
 * transitive association, the user 'has' the permissions in their roles.
 *
 * There are numerous variations on this theme (permissions assigned directly
 * to users, or assigned to groups, and users added to groups and these groups
 * in turn have roles, etc, etc).
 *
 * By employing a permission-based security model instead of a role-based one,
 * users, roles, and groups can all be created, configured and/or deleted at
 * runtime. This enables an extremely powerful security model.
 *
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since  0.1.0
 * @version 0.2.0
 * @public
 */


/**
 * @apiDefine Permission
 * @apiSuccess {String} _id Unique permission identifier
 * @apiSuccess {String} resource Resource constrained by a permission
 * @apiSuccess {String} action Action(or permit) constrained(or granted)
 * by a permission
 * @apiSuccess {String} [description] A brief summary about a permission if
 * available i.e additional details that clarify what a permission for
 * @apiSuccess {String} [wildcard] System generated unique identifier of
 * a permission
 * @apiSuccess {Date} createdAt Date when permission was created
 * @apiSuccess {Date} updatedAt Date when permission was last updated
 *
 */


/**
 * @apiDefine Permissions
 * @apiSuccess {Object[]} data List of permissions
 * @apiSuccess {String} data._id Unique permission identifier
 * @apiSuccess {String} data.resource Resource constrained by a permission
 * @apiSuccess {String} data.action Action(or permit) constrained(or granted)
 * by a permission
 * @apiSuccess {String} [data.description] A brief summary about a permission if
 * available i.e additional details that clarify what a permission for
 * @apiSuccess {String} [data.wildcard] System generated unique identifier of
 * a permission
 * @apiSuccess {Date} data.createdAt Date when permission was created
 * @apiSuccess {Date} data.updatedAt Date when permission was last updated
 * @apiSuccess {Number} total Total number of permission
 * @apiSuccess {Number} size Number of permissions returned
 * @apiSuccess {Number} limit Query limit used
 * @apiSuccess {Number} skip Query skip/offset used
 * @apiSuccess {Number} page Page number
 * @apiSuccess {Number} pages Total number of pages
 * @apiSuccess {Date} lastModified Date and time at which latest permission
 * was last modified
 *
 */


/**
 * @apiDefine PermissionSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "_id": "5b622350480e576243f10d8b",
 *   "resource": "Task",
 *   "action": "create",
 *   "description": "In quos quae sed consectetur voluptas praesentium.",
 *   "wildcard": "task:create",
 *   "updatedAt": "2018-08-01T21:17:04.729Z",
 *   "createdAt": "2018-08-01T21:17:04.729Z"
 * }
 *
 */


/**
 * @apiDefine PermissionsSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "data": [
 *     {
 *       "_id": "5b622350480e576243f10d8b",
 *       "resource": "Task",
 *       "action": "create",
 *       "description": "In quos quae sed consectetur voluptas praesentium.",
 *       "wildcard": "task:create",
 *       "updatedAt": "2018-08-01T21:17:04.729Z",
 *       "createdAt": "2018-08-01T21:17:04.729Z"
 *     }
 *   ],
 *   "total": 20,
 *   "size": 10,
 *   "limit": 10,
 *   "skip": 0,
 *   "page": 1,
 *   "pages": 2,
 *   "lastModified": "2018-07-29T10:11:38.111Z"
 * }
 */


/* dependencies */
const _ = require('lodash');
const { getString } = require('@lykmapipo/env');
const {
  Router,
  getFor,
  schemaFor,
  postFor,
  getByIdFor,
  patchFor,
  putFor,
  deleteFor
} = require('@lykmapipo/express-rest-actions');


/* constants */
const API_VERSION = getString('API_VERSION', '1.0.0');
const PATH_SINGLE = '/permissions/:id';
const PATH_LIST = '/permissions';
const PATH_SCHEMA = '/permissions/schema/';


/* declarations */
const Permission = require('./permission.model');
const router = new Router({
  version: API_VERSION
});


/**
 * @api {get} /permissions List Permissions
 * @apiVersion 1.0.0
 * @apiName GetPermissions
 * @apiGroup Permission
 * @apiDescription Returns a list of permissions
 * @apiUse RequestHeaders
 * @apiUse Permissions
 *
 * @apiUse RequestHeadersExample
 * @apiUse PermissionsSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_LIST, getFor({
  get: (query, done) => {
    const options = { limit: Number.MAX_SAFE_INTEGER };
    return Permission.get(options, done);
  }
}));


/**
 * @api {get} /permissions/schema Get Permission Schema
 * @apiVersion 1.0.0
 * @apiName GetPermissionSchema
 * @apiGroup Permission
 * @apiDescription Returns permission json schema definition
 * @apiUse RequestHeaders
 */
router.get(PATH_SCHEMA, schemaFor({
  getSchema: (query, done) => {
    const jsonSchema = Permission.jsonSchema();
    return done(null, jsonSchema);
  }
}));


/**
 * @api {post} /permissions Create New Permission
 * @apiVersion 1.0.0
 * @apiName PostPermission
 * @apiGroup Permission
 * @apiDescription Create new permission
 * @apiUse RequestHeaders
 * @apiUse Permission
 *
 * @apiUse RequestHeadersExample
 * @apiUse PermissionSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.post(PATH_LIST, postFor());


/**
 * @api {get} /permissions/:id Get Existing Permission
 * @apiVersion 1.0.0
 * @apiName GetPermission
 * @apiGroup Permission
 * @apiDescription Get existing permission
 * @apiUse RequestHeaders
 * @apiUse Permission
 *
 * @apiUse RequestHeadersExample
 * @apiUse PermissionSuccessResponse
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_SINGLE, getByIdFor({
  getById: (query, done) => Permission.getById(query, done)
}));


/**
 * @api {patch} /permissions/:id Patch Existing Permission
 * @apiVersion 1.0.0
 * @apiName PatchPermission
 * @apiGroup Permission
 * @apiDescription Patch existing permission
 * @apiUse RequestHeaders
 * @apiUse Permission
 *
 * @apiUse RequestHeadersExample
 * @apiUse PermissionSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.patch(PATH_SINGLE, patchFor({
  patch: (query, done) => {
    const options = _.pick(query, '_id', 'description');
    return Permission.patch(options, done);
  }
}));



/**
 * @api {put} /permissions/:id Put Existing Permission
 * @apiVersion 1.0.0
 * @apiName PutPermission
 * @apiGroup Permission
 * @apiDescription Put existing permission
 * @apiUse RequestHeaders
 * @apiUse Permission
 *
 * @apiUse RequestHeadersExample
 * @apiUse PermissionSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.put(PATH_SINGLE, putFor({
  put: (query, done) => {
    const options = _.pick(query, '_id', 'description');
    return Permission.put(options, done);
  }
}));


/**
 * @api {delete} /permissions/:id Delete Existing Permission
 * @apiVersion 1.0.0
 * @apiName DeletePermission
 * @apiGroup Permission
 * @apiDescription Delete existing permission
 * @apiUse RequestHeaders
 * @apiUse Permission
 *
 * @apiUse RequestHeadersExample
 * @apiUse PermissionSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.delete(PATH_SINGLE, deleteFor());


/* expose permission router */
module.exports = exports = router;
