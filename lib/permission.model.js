'use strict';


/**
 * @module Permission
 * @name Permission
 * @description An entity that defines permits(access rights) that are
 * assignable to role(s) to control what role(s) can see and do
 *
 * Note!: permissions are dynamic generated during booting and are only
 * assignable to role(s).
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 1.0.0
 * @public
 */


/*
 * @todo support permission generation from model as resource
 * @todo support permission seed
 */


/* dependencies */
const _ = require('lodash');
const env = require('@lykmapipo/env');
const inflection = require('inflection');
const mongoose = require('mongoose');
const actions = require('mongoose-rest-actions');
const { Schema } = mongoose;


/* constants */
const PERMISSION_MODEL_NAME =
  env('PERMISSION_MODEL_NAME', 'Permission');
const PERMISSION_COLLECTION_NAME =
  env('PERMISSION_COLLECTION_NAME', 'permissions');
const SCHEMA_OPTIONS = ({ timestamps: true, emitIndexErrors: true });


/**
 * @name PermissionSchema
 * @type {Schema}
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 1.0.0
 * @private
 */
const PermissionSchema = new Schema({
  /**
   * @name resource
   * @description Resource constrained by a permission.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {boolean} index - ensure database index
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   *
   * @author lally elias <lallyelias87@gmail.com>
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   * @example
   * Party, Activity, Task etc.
   */
  resource: {
    type: String,
    trim: true,
    required: true,
    index: true,
    searchable: true,
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
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {boolean} index - ensure database index
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   *
   * @author lally elias <lallyelias87@gmail.com>
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   * @example
   * Create, Update, Delete, Send etc.
   */
  action: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    index: true,
    searchable: true,
    fake: {
      generator: 'hacker',
      type: 'verb'
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
   * @property {boolean} index - ensure database index
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   *
   * @author lally elias <lallyelias87@gmail.com>
   * @since 0.1.0
   * @version 1.0.0
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
   * @property {boolean} trim - force trimming
   * @property {boolean} required - mark required
   * @property {boolean} index - ensure database index
   * @property {boolean} unique - ensure database unique index
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   *
   * @author lally elias <lallyelias87@gmail.com>
   * @since 0.1.0
   * @version 1.0.0
   * @instance
   * @example
   * task:create, task:edit, task:close etc
   */
  wildcard: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    index: true,
    unique: true,
    searchable: true
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
 * @version 1.0.0
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
 * @version 1.0.0
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
 * @version 1.0.0
 * @instance
 */
PermissionSchema.methods.preValidate = function preValidate(done) {

  //normalize attributes

  //classify resource
  if (!_.isEmpty(this.resource)) {
    this.resource = inflection.classify(this.resource);
  }

  //lowercase action
  if (!_.isEmpty(this.action)) {
    this.action = _.toLower(this.action);
  }

  //ensure description
  if (_.isEmpty(this.description)) {
    this.description = [this.resource, this.action].join(' ');
  }

  //generate wildcard
  const shouldGenerateWildcard =
    (_.isEmpty(this.wildcard) && !_.isEmpty(this.resource) &&
      !_.isEmpty(this.action));
  if (shouldGenerateWildcard) {
    this.wildcard = [this.resource, this.action].join(':');
  }

  //continue
  done();

};


/*
 *------------------------------------------------------------------------------
 * Statics
 *------------------------------------------------------------------------------
 */


/* static constants */
PermissionSchema.statics.MODEL_NAME = PERMISSION_MODEL_NAME;
PermissionSchema.statics.COLLECTION_NAME = PERMISSION_COLLECTION_NAME;


/**
 * @name seed
 * @function seed
 * @description seed permissions into database
 * @param {Permission[]} [permissions] set of permission(s) to seed
 * @param {function} done callback to invoke on success or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 1.0.0
 * @public
 */
PermissionSchema.statics.seed = function seed(seeds, done) {
  //normalize arguments
  const _seeds = _.isFunction(seeds) ? [] : seeds;
  const _done = _.isFuction(seeds) ? seeds : done;

  return _done(null, _seeds);
};


/*
 *------------------------------------------------------------------------------
 * Plugins
 *------------------------------------------------------------------------------
 */


/* plug mongoose rest actions*/
PermissionSchema.plugin(actions);


/* export permission model */
module.exports = mongoose.model(PERMISSION_MODEL_NAME, PermissionSchema);
