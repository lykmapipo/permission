'use strict';


/* ensure mongodb uri */
process.env.MONGODB_URI =
  (process.env.MONGODB_URI || 'mongodb://localhost/permission');


/* dependencies */
const path = require('path');
const _ = require('lodash');
const async = require('async');
const mongoose = require('mongoose');
const { env } = require('@codetanzania/majifix-common');
const { getStrings } = env;
const {
  Permission,
  permissionRouter,
  info,
  app
} = require(path.join(__dirname, '..'));


/* establish mongodb connection */
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });


function boot() {

  async.waterfall([

    function clear(next) {
      Permission.deleteMany(function ( /*error, results*/ ) {
        next();
      });
    },

    function seedPermission(next) {
      const permissions = Permission.fake(32);
      Permission.create(permissions, next);
    }

  ], function (error, results) {

    /* expose module info */
    app.get('/', function (request, response) {
      response.status(200);
      response.json(info);
    });

    /* fire the app */
    app.start(function (error, env) {
      console.log(`visit http://0.0.0.0:${env.PORT}`);
    });

  });

}

boot();
