/**
 * Created by OBrien on 5/27/2015.
 */

var EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    dispatcher = require('./FoosballDispatcher'),
    constants = require('./NotificationConstants'),
    actionCreator = require('./PlayerActionCreator');

var CHANGE_EVENT = 'change';

var players;

function getPlayers(){
    if(players){
        return players;
    }else{
        actionCreator.loadPlayers();
        return [];
    }
}

var playerStore = assign({}, EventEmitter.prototype, {
    getPlayers: getPlayers,
    emitChange: function(){
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback){
        this.on(CHANGE_EVENT, callback);
    }
});

dispatcher.register(function(action){
   switch(action.type){
       case constants.PLAYERS_LOADED:
           console.log("PLAYERS:", action);
           players = action.data;
           playerStore.emitChange();
   }
});

module.exports = playerStore;