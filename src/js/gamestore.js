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
    player1Score: '9',
    player2Score: '0'
};

var queue;

var games;

function getCurrentGame() {
    return currentGame;
}

var gameStore = assign({}, EventEmitter.prototype, {
    getCurrentGame: getCurrentGame,
    getGames: function () {
        if(games) {
            return games;
        }else{
            actionCreator.loadGames();
            return [];
        }
    },
    getQueue: function () {
        if(queue){
            return queue;
        }else{
            actionCreator.loadQueue();
            return [];
        }
    },
    emitChange: function(){
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(cb){
        this.on(CHANGE_EVENT, cb);
    }
});

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
   } 
});

module.exports = gameStore;