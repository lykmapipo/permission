'use strict';


/* dependencies */
const mongoose = require('mongoose');


/* wipe test database instance */
function wipe(done) {
  if (mongoose.connection && mongoose.connection.dropDatabase) {
    mongoose.connection.dropDatabase(done);
  } else {
    done();
  }
}


/* setup test database instance */
before(function (done) {
  mongoose.connect('mongodb://localhost/permission', { useNewUrlParser: true },
    done);
});


/* clear test database instance */
before(wipe);


/* clear test database instance */
after(wipe);
