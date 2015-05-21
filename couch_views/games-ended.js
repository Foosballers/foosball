/**
 * Created by OBrien on 5/16/2015.
 */

var view = {
    map: function (doc) {
        if (doc.status === 'ended') {
            emit(doc.epoch_date, null);
        }
    }
}

module.exports = view;