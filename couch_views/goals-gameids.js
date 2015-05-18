/**
 * Created by OBrien on 5/16/2015.
 */

var view = {
    map: function (doc) {
        if (doc.type === 'goal') {
            emit(doc.gameid, null);
        }
    }
}

module.exports = view;