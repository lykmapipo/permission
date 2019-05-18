'use strict';

/* dependencies */
const { include } = require('@lykmapipo/include');
const { Permission } = include(__dirname, '..', '..');

// export resource seeds
module.exports = exports = Permission.prepareResourcesPermissions();
