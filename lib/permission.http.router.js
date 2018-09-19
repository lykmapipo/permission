'use strict';


/**
 * @apiDefine Permission Permission
 *
 * @apiDescription An entity that defines permits(access rights) that are
 * assignable to permission(s) to control what permission(s) can see and do
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
const path = require('path');
const _ = require('lodash');
const { env } = require('@codetanzania/majifix-common');
const Router = require('@lykmapipo/express-common').Router;


/* constants */
const { API_VERSION } = env;
const PATH_SINGLE = '/permissions/:id';
const PATH_LIST = '/permissions';
const PATH_SCHEMA = '/permissions/schema/';


/* declarations */
const Permission = require(path.join(__dirname, 'permission.model'));
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
router.get(PATH_LIST, function getPermissions(request, response, next) {

  //obtain request options
  const options = _.merge({}, request.mquery);

  Permission
    .get(options, function onGetPermissions(error, results) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(results);
      }

    });

});


/**
 * @api {get} /permissions/schema Get Permission Schema
 * @apiVersion 1.0.0
 * @apiName GetPermissionSchema
 * @apiGroup Permission
 * @apiDescription Returns permission json schema definition
 * @apiUse RequestHeaders
 */
router.get(PATH_SCHEMA, function getSchema(request, response) {
  const schema = Permission.jsonSchema();
  response.status(200);
  response.json(schema);
});


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
router.get(PATH_SINGLE, function getPermission(request, response, next) {

  //obtain request options
  const options = _.merge({}, request.mquery);

  //obtain permission id
  options._id = request.params.id;

  Permission
    .getById(options, function onGetPermission(error, found) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(found);
      }

    });

});


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
router.patch(PATH_SINGLE, function patchPermission(request, response, next) {

  //obtain permission id
  const _id = request.params.id;

  //obtain request body
  const patches = _.merge({}, request.only('description'));


  Permission
    .patch(_id, patches, function onPatchPermission(error, patched) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(patched);
      }

    });

});



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
router.put(PATH_SINGLE, function putPermission(request, response, next) {

  //obtain permission id
  const _id = request.params.id;

  //obtain request body
  const updates = _.merge({}, request.only('description'));

  Permission
    .put(_id, updates, function onPutPermission(error, updated) {

      //forward error
      if (error) {
        next(error);
      }

      //handle response
      else {
        response.status(200);
        response.json(updated);
      }

    });

});


/* expose permission router */
module.exports = router;
