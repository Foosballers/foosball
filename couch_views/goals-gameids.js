/**
 * Created by OBrien on 5/16/2015.
 */

var view = {
    map: function (doc) {
        if (doc.type === 'goal') {
            emit(doc.gameid);
        }
    }
}

module.exports = view;
