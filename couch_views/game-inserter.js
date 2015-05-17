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

function insert(randomGame) {
    foosdb.insert(randomGame, randomGame._id,
        function (err, body, header) {
            if (err)
                return console.error('[random_game.insert] ', err.message)
        });
}

for (var i = 0; i < 50; i++) {
    var randomGame = getGame(i);
    insert(randomGame);
}

for (var i = 52; i < 58; i++) {
    var randomGame = getGame(i);
    randomGame.player1Score = null;
    randomGame.player2Score = null;
    randomGame.status = 'queued';
    insert(randomGame);
}

insertView('page', 'payload', 'page-payload-simplified');
insertView('games', 'queued', 'games-queued');

function insertView(designDocName, viewName, fileName){
    var docName = '_design/' + designDocName;
    foosdb.get(docName, function(err,existing) {
        var page_payload_view = require('./' + fileName)
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
            var views = { views: { } }
            views.views[viewName] = page_payload_view;
            console.log('view', views);
            foosdb.insert(views, docName, debug_callback)
            return
        }

        var updated_view = existing.views
        updated_view[viewName] = page_payload_view
        existing.views = updated_view
        foosdb.insert(existing, docName, debug_callback)
    })
}
