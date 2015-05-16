var config = require('./config')
var nano = require('nano')(config.couchdb.uri)

var games = nano.use('foosball-games')
var goals = nano.use('foosball-goals')

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
        data.state = 'inprogess'
        data.epoch_date = now()
        games.get(data.id, function(error, existing) {
            if(error) {
                if(error.error !== 'not_found') {
                    console.error(error); return;
                }
                games.insert(data, data.id, debug_callback)
                return
            }
            data._rev = existing._rev
            games.insert(data, data.id, debug_callback)
        })
    },
    storeGameEnded: function(data) {
        if(!config.couchdb.enabled) return;
        games.get(data.id, function(error, existing) {
            if(error) { console.error(error); return; }
            data.state = 'ended'
            data.runtime = now() - existing.epoch_date
            data.epoch_date = existing.epoch_date
            data._rev = existing._rev
            games.insert(data, data.id, debug_callback)
        })
    },
    storeGoal: function(data) {
        if(!config.couchdb.enabled) return;
        data.epoch_date = now()
        goals.insert(data, debug_callback)
    },
    storeGameQueued: function(data) {
        if(!config.couchdb.enabled) return;
        data.state = 'queued'
        data.epoch_date = now()
        games.insert(data, data.id, debug_callback)
    }
}

module.exports = vault