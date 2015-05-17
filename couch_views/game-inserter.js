var config = require('../config');
var nano = require('nano')(config.couchdb.uri);

var foosdb = nano.use('foosball')

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getGame(index) {

    var players = ['Keith', 'Max', 'Kavin', 'Boguste', 'Max/Keith', 'Kavin/Dimitri', 'Boguste/Kavin', 'Kevin'];
    var randomGame = {
        _id: index.toString(),
        player1: players[getRandomInt(0, players.length - 1)],
        player2: players[getRandomInt(0, players.length - 1)],
        player1Score: index % 2 === 0 ? 10 : getRandomInt(0, 9),
        player2Score: index % 2 !== 0 ? 10 : getRandomInt(0, 9),
        type: 'game',
        runtime: 123
    };

    if (randomGame.player1 === randomGame.player2) {
        randomGame.player2 = players[getRandomInt(0, players.length - 1)];
    }
    return randomGame;
}

function insert(index) {
    var randomGame = getGame(index);
    foosdb.insert(randomGame, index,
        function (err, body, header) {
            if (err)
                return console.error('[random_game.insert] ', err.message)

            console.log('you have inserted a game.')
            console.log(body)
        });
}

for (var i = 0; i < 50; i++) {
    insert(i);
}

foosdb.get('_design/page', function(err,existing) {
    var page_payload_view = require('./page-payload-simplified')
    var debug_callback= function(err, body) {
        if(err)
            return console.error('[views.insert] ', err)
        console.log('views inserted')
        console.log(body)
    }

    if(err) {
        if(err.error !== 'not_found') {
            console.error(err); return;
        }
        var views = {
            views: {
                payload: page_payload_view
            }
        }
        foosdb.insert(views, '_design/page', debug_callback)
        return
    }

    var updated_view = existing.views
    updated_view.payload = page_payload_view
    existing.views = updated_view
    foosdb.insert(existing, '_design/page', debug_callback)
})