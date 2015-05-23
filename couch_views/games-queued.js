/**
 * Created by OBrien on 5/16/2015.
 */

var view = {
    map: function (doc) {
        if (doc.status === 'queued') {
            emit(doc.epoch_date);
        }
    }
}

module.exports = view;
