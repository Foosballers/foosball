/**
 * Created by mph on 5/16/2015.
 */

var view = {
    //map
    map: function (doc) {
        //w/o 'runtime' the game is yet to complete
        if(!(doc.type === 'game' && doc.runtime)) return;
        doc.player1score > doc.player2score ? (winner=doc.player1,loser=doc.player2) : (winner=doc.player2,loser=doc.player1);
        emit(winner, 1);
        emit(loser, 0);
    },

    //reduce
    reduce: function (mapKeys, values, rereduce) {
        if(rereduce) {
            var stats = { wins: 0, losses: 0 };
            for(var i=0; i<values.length; i++) {
                stats.wins += values[i].wins;
                stats.losses += values[i].losses;
            }
            return stats;
        }

        winct = sum(values);
        return { wins: winct, losses: values.length - winct };
    }
}

module.exports = view