/**
 * Created by mph on 5/16/2015.
 */

var view = {
    //map
    map: function (doc) {
        if(doc.type === 'player') {
            emit(doc._id);
        }
    }
}

module.exports = view
