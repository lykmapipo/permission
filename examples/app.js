'use strict';


/* ensure mongo uri */
process.env.MONGODB_URI =
  (process.env.MONGODB_URI || 'mongodb://localhost/permission');


/* dependencies */
const { connect } = require('@lykmapipo/mongoose-common');
const { include } = require('@lykmapipo/include');
const { Permission, apiVersion, info, app } = include(__dirname, '..');


// establish mongodb connection
connect((error) => {

  // seed permissions
  Permission.seed((error, results) => {

    // expose module info
    app.get('/', (request, response) => {
      response.status(200);
      response.json(info);
    });

    // fire the app
    app.start((error, env) => {
      console.log(`visit http://0.0.0.0:${env.PORT}`);
    });

  });

});
