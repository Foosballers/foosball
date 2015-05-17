/**
 * Created by OBrien on 5/16/2015.
 */

function (doc) {
    if (doc.status === 'queued') {
        emit(doc._id, doc);
    }
}