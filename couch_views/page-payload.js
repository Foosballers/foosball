/**
 * Created by OBrien on 5/16/2015.
 */

var view = {
    //map
    map: function (doc) {
        if(doc.type === 'game' && doc.runtime) {
            var winner = doc.player1Score > doc.player2Score ? doc.player1 : doc.player2;
            var loser =  winner === doc.player1 ? doc.player2 : doc.player1;
            emit(doc._id, {winner: winner, loser: loser});
        }
    },

    //reduce
    reduce: function (mapKeys, values, rereduce) {
        if (rereduce) {
            return values;
        } else {
            var results = {};
            values.map(function (game) {
                var w = game.winner,
                    l = game.loser;
                if (results[w]) {
                    results[w].wins += 1;
                }
                else {
                    results[w] = {wins: 1, losses: 0};
                }
                if (results[l]) {
                    results[l].losses += 1;
                }
                else {
                    results[l] = {wins: 0, losses: 1};
                }
            });
            return results;
        }
    }
}

module.exports = view