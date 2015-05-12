/**
 * Created by OBrien on 5/11/2015.
 */

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var currentGame = {
    id: Date.now(),
    player1: 'Keith',
    player2: 'Kavin',
    player1Score: '9',
    player2Score: '0'
};

var queue = [{
    id: Date.now() + 50,
    player1: 'Boguste',
    player2: 'Dimitri'
},
    {
        id: Date.now() + 50,
        player1: 'Boguste',
        player2: 'Keith'
    }];

var games = [
    {
        id: Date.now(),
        player1: 'Kavin',
        player2: 'Keith',
        player1Score: '0',
        player2Score: '10'
    }, {
        id: Date.now() + 5,
        player1: 'Keith',
        player2: 'Kavin',
        player1Score: '10',
        player2Score: '1'
    }
];

function getCurrentGame() {
    return currentGame;
}

var GameStore = assign({}, EventEmitter.prototype, {
    getCurrentGame: getCurrentGame,
    getGames: function () {
        return games;
    },
    getQueue: function () {
        return queue;
    }
});

module.exports = GameStore;