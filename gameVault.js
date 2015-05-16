var config = require('./config')
var nano = require('nano')(config.couchdb.uri)

var games = nano.use('foosball-games')

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
        data.runtime = NaN
        data.epoch_date = now()
        games.insert(data, data.id, debug_callback)
    },
    storeGameEnded: function(data) {
        games.get(data.id, function(error, existing) {
            if(error) { console.error(error); return; }
            data.runtime = now() - existing.epoch_date
            data.epoch_date = existing.epoch_date
            data._rev = existing._rev
            games.insert(data, data.id, debug_callback)
        })
    }
}

module.exports = vault