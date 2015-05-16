var Cloudant = require('cloudant')

var me = 'thedreadpirate'; // Set this to your own account
var password = 'passw0rd';

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
        type: 'game-result'
    };

    if (randomGame.player1 === randomGame.player2) {
        randomGame.player2 = players[getRandomInt(0, players.length - 1)];
    }
    return randomGame;
}

function insert(index) {
    Cloudant({account: me, password: password}, function (er, cloudant) {
        if (er)
            return console.log('Error connecting to Cloudant account %s: %s', me, er.message)

        var foosball = cloudant.use('foosball');
        // and insert a document in it
        var randomGame = getGame(index);
        foosball.insert(randomGame,
            function (err, body, header) {
                if (err)
                    return console.log('[alice.insert] ', err.message)

                console.log('you have inserted a game.')
                console.log(body)
            });
    });
}

for (var i = 0; i < 50; i++) {
    insert(i);
}