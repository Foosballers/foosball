var config = require('../config');
var nano = require('nano')(config.couchdb.uri);

nano.db.destroy('foosball')
nano.db.create('foosball')