/**
 * Created by OBrien on 5/11/2015.
 */

var EventEmitter = require('events').EventEmitter,
    actionCreator = require('./gamesActionCreator'),
    dispatcher = require('./FoosballDispatcher'),
    constants = require('./NotificationConstants'),   
    assign = require('object-assign');

var CHANGE_EVENT = 'change';

var currentGame = {
    id: Date.now(),
    player1: 'Keith',
    player2: 'Kavin',
    player1Score: 9,
    player2Score: 0
};

var queue;

var games;

function getCurrentGame() {
    return currentGame;
}

var gameStore = assign({}, EventEmitter.prototype, {
    getCurrentGame: getCurrentGame,
    getGames: function () {
        if(!games) {
            actionCreator.loadGames();
            games = [];
        }
        return games;
    },
    getQueue: function () {
        if(!queue){
            actionCreator.loadQueue();
            queue = [];
        }
        return queue;
    },
    emitChange: function(){
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(cb){
        this.on(CHANGE_EVENT, cb);
    }
});

function gameQueued(game){
    queue.push(game);
    gameStore.emitChange();
}

function gameStarted(newGame){
    currentGame = newGame;
    var loc = queue.findIndex(function(game){
        return game.id === newGame.id
    });
    if(loc != -1) {
        queue.splice(loc, 1);
    }

    gameStore.emitChange();
}

function gameEnded(game){
    games.unshift(game);
    gameStore.emitChange();
}

dispatcher.register(function(action){
   switch(action.type){
       case constants.GAMES_UPDATED:
           games = action.data;
           gameStore.emitChange();
           break;
       case constants.QUEUE_UPDATED:
           queue = action.data;
           gameStore.emitChange();
           break;
       case constants.GAME_STARTED:
           gameStarted(action.data);
           break;
       case constants.GOAL_SCORED:
           if(action.data.player === 'player1'){
               currentGame.player1Score +=1;
           }else{
               currentGame.player2Score += 1;
           }
           gameStore.emitChange();
           break;
       case constants.GAME_ENDED:
           gameEnded(action.data);
           break;
       case constants.GAME_QUEUED:
           gameQueued(action.data);
           break;
   } 
});

module.exports = gameStore;