var config = require('../config');
var nano = require('nano')(config.couchdb.uri);

var foosdb = nano.use('foosball')

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var players = ['Keith', 'Max', 'Kavin', 'Boguste', 'Keith/Max', 'Dimitri/Kavin', 'Boguste/Kavin', 'Kevin'];

function insertPlayers() {
    var players_maybe_dups = Function.prototype.apply.bind(Array.prototype.concat, [])(players.map(function(elm){ return elm.split('/') }));
    var singlePlayers = players_maybe_dups.reduce(function(p,c){if(p.indexOf(c)<0){p.push(c);}return p;}, []);
    for (var pi=0; pi < singlePlayers.length; pi ++) {
        foosdb.insert({type:'player'},singlePlayers[pi],function(err,body,header){
            if(err){
                return console.error('[insert.player] ', err.message);
            };
        });
    }
}

insertPlayers()

function getGame(index) {
    var randomGame = {
        id: index.toString(),
        player1: players[getRandomInt(0, players.length - 1)],
        player2: players[getRandomInt(0, players.length - 1)],
        player1Score: index % 2 === 0 ? 10 : getRandomInt(0, 9),
        player2Score: index % 2 !== 0 ? 10 : getRandomInt(0, 9),
        type: 'game',
        runtime: 123,
        epoch_date: getRandomInt(321, 4321)
    };

    if (randomGame.player1 === randomGame.player2) {
        randomGame.player2 = players[getRandomInt(0, players.length - 1)];
    }
    return randomGame;
}

function insert(randomGame) {
    foosdb.insert(randomGame, randomGame.id,
        function (err, body, header) {
            if (err)
                return console.error('[random_game.insert] ', err.message)
        });
}

function insertGoals(goals) {
    foosdb.bulk({docs:goals}, function(err,body,header){
        if (err)
            return console.error('[random_goal.insert] ', err.message)
    });
}

for (var i = 0; i < 50; i++) {
    var randomGame = getGame(i);
    randomGame.status = 'ended'
    insert(randomGame);
    var p1 = []
    var p2 = []
    var totalScore = randomGame.player1Score + randomGame.player2Score;
    var time = function() { return Math.floor(Math.random() * totalScore * 20); }
    for(var _goal = 0; _goal < randomGame.player1Score && _goal < 9; _goal++) {
        p1.push({gameid:randomGame.id, epoch_date: time(), type: 'goal', player: randomGame.player1});
    }
    for(var _goal = 0; _goal < randomGame.player2Score && _goal < 9; _goal++) {
        p1.push({gameid:randomGame.id, epoch_date: time(), type: 'goal', player: randomGame.player2});
    }
    randomGame.player1Score === 10
        ? p1.push({gameid: randomGame.id, epoch_date: totalScore * 21, type: 'goal', player: randomGame.player1})
        : p2.push({gameid: randomGame.id, epoch_date: totalScore * 21, type: 'goal', player: randomGame.player2});
    insertGoals(p1.concat(p2));
}

for (var i = 52; i < 58; i++) {
    var randomGame = getGame(i);
    randomGame.player1Score = null;
    randomGame.player2Score = null;
    randomGame.status = 'queued';
    insert(randomGame);
}

function insertRandomGameGoals(gameId, playerX, date) {
    var goal = { gameid: gameId, player: playerX, epoch_date: date, type: 'goal' }
    foosdb.insert(goal, function(err, body, header) {
        if(err)
            return console.error('[random_goal.insert] ', err.message)
    });
}

insertRandomGameGoals('game-03','alpha', 3);
insertRandomGameGoals('game-03','alpha', 7);
insertRandomGameGoals('game-03','beta', 17);
insertRandomGameGoals('game-03','alpha', 21);
insertRandomGameGoals('game-03','beta', 25);
insertRandomGameGoals('game-03','alpha', 31);
insertRandomGameGoals('game-03','beta', 39);
insertRandomGameGoals('game-03','alpha', 45);
insertRandomGameGoals('game-03','beta', 61);
insertRandomGameGoals('game-03','alpha', 70);
insertRandomGameGoals('game-03','alpha', 81);
insertRandomGameGoals('game-03','beta', 90);
insertRandomGameGoals('game-03','beta', 100);
insertRandomGameGoals('game-03','beta', 105);
insertRandomGameGoals('game-03','beta', 115);
insertRandomGameGoals('game-03','beta', 130);
insertRandomGameGoals('game-03','alpha', 150);
insertRandomGameGoals('game-03','beta', 158);

insertViews('page', [['payload','page-payload-simplified'], ['players', 'page-players']])
insertViews('games', [['queued','games-queued'], ['ended','games-ended']])
insertViews('goals', [['gameids','goals-gameids']])

function insertViews(designDocName, listOfViewDatas) {
    if(typeof listOfViewDatas === undefined || listOfViewDatas.length === 0)
        return;
    var docName = '_design/' + designDocName
    foosdb.get(docName, function(err, existing) {
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
            existing = { views: { } }
        }

        listOfViewDatas.forEach(function(viewData) {
            existing.views[viewData[0]] = require('./' + viewData[1])
        })
        foosdb.insert(existing, docName, debug_callback)
    })
}
