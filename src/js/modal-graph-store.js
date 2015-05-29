var EventEmitter = require('events').EventEmitter,
    dispatcher = require('./FoosballDispatcher'),
    constants = require('./NotificationConstants'),
    assign = require('object-assign');

var CHANGE_EVENT = 'change';

var modalgame;

var modalgamestore = assign({}, EventEmitter.prototype, {
    getModalGame: function() {
      return modalgame;
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
       case constants.MODAL_SHOW_GAME:
           modalgame = action.data;
           modalgamestore.emitChange();
           break;
   }
});

module.exports = modalgamestore;