'use strict';


/**
 * @module Permission
 * @name Permission
 * @description A representation of ability to perform an action or
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
 * @see {@link https://en.wikipedia.org/wiki/Role-based_access_control}
 * @see {@link https://shiro.apache.org/permissions.html}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.2.0
 * @public
 */


/* dependencies */
const path = require('path');
const _ = require('lodash');
const inflection = require('inflection');
const { waterfall, parallel } = require('async');
const { sortedUniq } = require('@lykmapipo/common');
const { getString, getStrings } = require('@lykmapipo/env');
const {
  SCHEMA_OPTIONS,
  Schema,
  model,
  modelNames,
  copyInstance
} = require('@lykmapipo/mongoose-common');
const actions = require('mongoose-rest-actions');


/* default actions */
const DEFAULT_ACTIONS = [
  'Create', 'View', 'Edit',
  'Delete', 'Share', 'Print',
  'Import', 'Export', 'Download'
];


/* schema options */
const MODEL_NAME = getString('PERMISSION_MODEL_NAME', 'Permission');
const COLLECTION_NAME = getString('PERMISSION_COLLECTION_NAME', 'permissions');
const PERMISSION_SEED = getString('PERMISSION_SEED', 'permissions');
const OPTION_AUTOPOPULATE = ({
  select: { resource: 1, action: 1, wildcard: 1 },
  maxDepth: 1
});


/**
 * @name PermissionSchema
 * @type {Schema}
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.2.0
 * @private
 */
const PermissionSchema = new Schema({
  /**
   * @name resource
   * @description Resource constrained by a permission.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} required - mark required
   * @property {boolean} trim - force trimming
   * @property {number} minlength - ensure not empty
   * @property {boolean} index - ensure database index
   * @property {boolean} searchable - allow for searching
   * @property {boolean} taggable - allow field use for tagging
   * @property {object} fake - fake data generator options
   *
   * @author lally elias <lallyelias87@gmail.com>
   * @since 0.1.0
   * @version 0.2.0
   * @instance
   * @example
   * Party, Activity, Task etc.
   */
  resource: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    index: true,
    searchable: true,
    taggable: true,
    fake: {
      generator: 'hacker',
      type: 'noun'
    }
  },


  /**
   * @name action
   * @description Action(or permit) constrained(or granted) by a permission.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} required - mark required
   * @property {boolean} trim - force trimming
   * @property {boolean} index - ensure database index
   * @property {boolean} searchable - allow for searching
   * @property {boolean} taggable - allow field use for tagging
   * @property {object} fake - fake data generator options
   *
   * @author lally elias <lallyelias87@gmail.com>
   * @since 0.1.0
   * @version 0.2.0
   * @instance
   * @example
   * Create, Update, Delete, Send etc.
   */
  action: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    lowercase: true,
    index: true,
    searchable: true,
    taggable: true,
    fake: {
      generator: 'lorem',
      type: 'sentence'
    }
  },


  /**
   * @name description
   * @description A brief summary about a permission if available i.e
   * additional details that clarify what a permission for.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {number} minlength - ensure not empty
   * @property {boolean} index - ensure database index
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   *
   * @author lally elias <lallyelias87@gmail.com>
   * @since 0.1.0
   * @version 0.2.0
   * @instance
   */
  description: {
    type: String,
    trim: true,
    index: true,
    searchable: true,
    fake: {
      generator: 'lorem',
      type: 'sentence'
    }
  },


  /**
   * @name wildcard
   * @description System generated unique identifier of a permission.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} required - mark required
   * @property {boolean} trim - force trimming
   * @property {boolean} lowercase - force to lowercase
   * @property {boolean} index - ensure database index
   * @property {boolean} unique - ensure database unique index
   * @property {boolean} searchable - allow for searching
   * @property {boolean} taggable - allow field use for tagging
   * @property {object} fake - fake data generator options
   *
   * @author lally elias <lallyelias87@gmail.com>
   * @since 0.1.0
   * @version 0.2.0
   * @instance
   * @example
   * task:create, task:edit, task:close etc
   */
  wildcard: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    index: true,
    unique: true,
    searchable: true,
    taggable: true
  }

}, SCHEMA_OPTIONS);


/*
 *------------------------------------------------------------------------------
 * Indexes
 *------------------------------------------------------------------------------
 */


/**
 * @name index
 * @description ensure unique compound index on resource and action
 * to force unique permission definition
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.2.0
 * @private
 */
PermissionSchema.index({ resource: 1, action: 1 }, { unique: true });


/*
 *------------------------------------------------------------------------------
 *  Hooks
 *------------------------------------------------------------------------------
 */


/**
 * @name validate
 * @function validate
 * @description permission schema pre validation hook
 * @param {function} done callback to invoke on success or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.2.0
 * @private
 */
PermissionSchema.pre('validate', function (done) {

  this.preValidate(done);

});


/*
 *------------------------------------------------------------------------------
 *  Instance
 *------------------------------------------------------------------------------
 */


/**
 * @name preValidate
 * @function preValidate
 * @description permission schema pre validation hook logic
 * @param {function} done callback to invoke on success or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.2.0
 * @instance
 */
PermissionSchema.methods.preValidate = function preValidate(done) {

  // classify resource
  if (!_.isEmpty(this.resource)) {
    this.resource = inflection.classify(this.resource);
  }

  // lowercase action
  if (!_.isEmpty(this.action)) {
    this.action = _.toLower(this.action);
  }

  // ensure description
  if (_.isEmpty(this.description)) {
    this.description = [this.resource, this.action].join(' ');
  }

  // generate wildcard
  const shouldGenerateWildcard =
    (!_.isEmpty(this.resource) && !_.isEmpty(this.action));
  if (shouldGenerateWildcard) {
    this.wildcard = _.toLower([this.resource, this.action].join(':'));
  }

  // continue
  done();

};


/*
 *------------------------------------------------------------------------------
 * Statics
 *------------------------------------------------------------------------------
 */


/* static constants */
PermissionSchema.statics.MODEL_NAME = MODEL_NAME;
PermissionSchema.statics.COLLECTION_NAME = COLLECTION_NAME;
PermissionSchema.statics.DEFAULT_ACTIONS = DEFAULT_ACTIONS;
PermissionSchema.statics.OPTION_AUTOPOPULATE = OPTION_AUTOPOPULATE;


/**
 * @name prepareSeedCriteria
 * @function prepareSeedCriteria
 * @description prepare permission seeding upsert criteria
 * @param {Object} seed plain object permission seed
 * @return {Object} criteria used to upsert permission
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.2.0
 * @public
 */
PermissionSchema.statics.prepareSeedCriteria = seed => {
  // prepare permission usert criteria by _id or fields
  let criteria = copyInstance(seed);
  criteria = (
    criteria._id ?
    _.pick(criteria, '_id') :
    _.pick(criteria, 'resource', 'action', 'wildcard')
  );

  // return permission upsert criteria
  return criteria;
};

/**
 * @name upsert
 * @function upsert
 * @description upsert permission
 * @param {permission} permission valid permission details
 * @param {function} done callback to invoke on success or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.2.0
 * @public
 */
PermissionSchema.statics.upsert = function upsert(permission, done) {

  // normalize arguments
  const _permission = copyInstance(permission);

  // refs
  const Permission = this;

  // upsert
  waterfall([
    function findExistingPermission(next) {
      // prepare criteria by _id or fields
      let criteria = _.merge({}, _permission);
      criteria = (
        criteria._id ?
        _.pick(criteria, '_id') :
        _.omit(criteria, 'description')
      );
      Permission.findOne(criteria, next);
    },

    function upsertPermission(found, next) {
      // instantiate if not found
      if (!found) {
        found = new Permission(_permission);
      }

      // upsert
      found.updatedAt = new Date();
      found.put(_permission, next);
    }
  ], done);
};


/**
 * @name seed
 * @function seed
 * @description seed permissions into database. On duplicate last changes will
 * override existing one.
 * @param {Permission[]} [permissions] set of permission(s) to seed
 * @param {function} done callback to invoke on success or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.2.0
 * @public
 */
PermissionSchema.statics.seed = function seed(seeds, done) {

  // normalize arguments
  let _seeds = _.isFunction(seeds) ? [] : [].concat(seeds);
  const _done = _.isFunction(seeds) ? seeds : done;

  // obtain .env resources name
  const PERMISSION_SEED_RESOURCES = getStrings('PERMISSION_SEED_RESOURCES', []);

  // obtain .env resources to igrone
  const PERMISSION_SEED_IGNORE = getStrings('PERMISSION_SEED_IGNORE', []);

  // prepare resource actions
  let PERMISSION_SEED_ACTIONS = getStrings('PERMISSION_SEED_ACTIONS', []);
  PERMISSION_SEED_ACTIONS =
    sortedUniq([...DEFAULT_ACTIONS, ...PERMISSION_SEED_ACTIONS]);

  // refs
  const Permission = this;

  // init permissions collection
  let permissions = [];

  // collect resources name from seed
  let resources = _.filter(_seeds, function (_seed) {
    return !_.isEmpty(_seed) && _.isString(_seed);
  });

  // collect resources name from models
  resources = [...resources, ...modelNames(), ...PERMISSION_SEED_RESOURCES];

  // remove ignored resources
  resources = sortedUniq(_.filter(resources, function (resource) {
    return !_.includes(PERMISSION_SEED_IGNORE, resource);
  }));

  // prepare each resource permisions
  _.forEach(resources, function (resource) {

    // generate resource simple name
    const simpleName = _.toLower(resource);

    // prepare resource permissions
    const _permissions = _.map(PERMISSION_SEED_ACTIONS, function (action) {
      return {
        resource: resource,
        action: _.toLower(action),
        description: `${action} ${simpleName}`
      };
    });

    // collect resource permissions
    permissions = [].concat(permissions).concat(_permissions);

  });

  // try load seeds from environment
  const BASE_PATH = getString('BASE_PATH', process.cwd());
  const SEEDS_PATH = getString('SEEDS_PATH', path.join(BASE_PATH, 'seeds'));
  const SEED_PATH = path.join(SEEDS_PATH, PERMISSION_SEED);
  try {
    const seed = require(SEED_PATH);
    _seeds = [].concat(_seeds).concat(seed);
  } catch (e) { /* ignore */ }

  // collect unique permissions from seeds
  _seeds = _.compact(_seeds);
  _seeds = _.uniqWith(_seeds, _.isEqual);

  // merge provided permissions
  _seeds = _.filter(_seeds, function (_seed) {
    return !_.isEmpty(_seed) && _.isPlainObject(_seed);
  });
  permissions = [].concat(permissions).concat(_seeds);

  // upsert permissions
  permissions = _.map(permissions, function (permission) {
    return function upsertPermissions(next) {
      Permission.upsert(permission, next);
    };
  });

  // seed permissions
  parallel(permissions, _done);

};


/*
 *------------------------------------------------------------------------------
 * Plugins
 *------------------------------------------------------------------------------
 */


/* plug mongoose rest actions*/
PermissionSchema.plugin(actions);


/* export permission model */
module.exports = exports = model(MODEL_NAME, PermissionSchema);
