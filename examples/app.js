'use strict';


/* dependencies */
const { connect } = require('@lykmapipo/mongoose-common');
const { include } = require('@lykmapipo/include');
const { get, mount, start } = require('@lykmapipo/express-common');
const { Permission, info, permissionRouter } = include(__dirname, '..');


// establish mongodb connection
connect(error => {
  // re-throw if error
  if (error) { throw error; }

  // expose module info
  get('/', (request, response) => {
    response.status(200);
    response.json(info);
  });

  // mount permission router
  mount(permissionRouter);

  // fire the app
  start((error, env) => {
    // re-throw if error
    if (error) { throw error; }

    // start http server
    console.log(`visit http://0.0.0.0:${env.PORT}`);
  });

});
