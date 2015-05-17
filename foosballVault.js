var config = require('./config')
var nano = require('nano')(config.couchdb.uri)

var foosdb = nano.use('foosball')

var debug_callback = function(error,body,header) {
    if(error){
        console.error(error)
        return
    }
    console.log(body)
}

var now = function() {
    return Date.now() / 1000 | 0
}

vault = {
    storeGameStarted: function(data) {
        if(!config.couchdb.enabled) return;
        data.type = 'game'
        data.state = 'inprogess'
        data.epoch_date = now()
        foosdb.get(data.id, function(error, existing) {
            if(error) {
                if(error.error !== 'not_found') {
                    console.error(error); return;
                }
                foosdb.insert(data, data.id, debug_callback)
                return
            }
            data._rev = existing._rev
            foosdb.insert(data, data.id, debug_callback)
        })
    },
    storeGameEnded: function(data) {
        if(!config.couchdb.enabled) return;
        foosdb.get(data.id, function(error, existing) {
            if(error) { console.error(error); return; }
            data.type = 'game'
            data.state = 'ended'
            data.runtime = now() - existing.epoch_date
            data.epoch_date = existing.epoch_date
            data._rev = existing._rev
            foosdb.insert(data, data.id, debug_callback)
        })
    },
    storeGoal: function(data) {
        if(!config.couchdb.enabled) return;
        data.type = 'goal'
        data.epoch_date = now()
        foosdb.insert(data, debug_callback)
    },
    storeGameQueued: function(data) {
        if(!config.couchdb.enabled) return;
        data.type = 'game'
        data.state = 'queued'
        data.epoch_date = now()
        foosdb.insert(data, data.id, debug_callback)
    },
    getView: function(doc, name, opts, cb){
        foosdb.view('page', 'payload-simplified', opts, cb);
    }
}

module.exports = vault