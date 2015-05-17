/**
 * Created by OBrien on 5/16/2015.
 */

var view = {
    map: function (doc) {
        if (doc.status === 'queued') {
            emit(doc._id, doc);
        }
    }
}

module.exports = view;