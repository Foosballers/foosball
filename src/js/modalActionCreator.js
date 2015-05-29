var constants = require('./NotificationConstants'),
    dispatcher = require('./FoosballDispatcher');

module.exports = {
    modalGame: function(game) {
        dispatcher.dispatch({
            type: constants.MODAL_SHOW_GAME,
            data: game
        });
    }
};
