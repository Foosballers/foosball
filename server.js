var express = require('express');
var bodyParser = require('body-parser');

var Pusher = require('pusher');

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: false
}));

var pusher = new Pusher({
    appId: '119859',
    key: '76abfc1ad02da9810a9d',
    secret: '07c4c701b5d1c864459d'
});

app.get('/players/standings', function(req, res) {
    res.send([{
        'player': 'Keith',
        'wins': 200,
        'losses': 4
    }, {
        'player': 'Kavin',
        'wins': 23,
        'losses': 23
    }, {
        'player': 'Max',
        'wins': 30,
        'losses': 29
    }])
});

app.get('/games/recent', function(req, res) {
    res.send([{
        id: 1,
        player1: 'Kavin',
        player2: 'Keith',
        player1Score: '0',
        player2Score: '10'
    }, {
        id: 10,
        player1: 'Keith',
        player2: 'Kavin',
        player1Score: '10',
        player2Score: '1'
    }]);
});

app.get('/games/queue', function(req, res) {
    res.send([{
        id: 1,
        player1: 'Dimitri',
        player2: 'Keith',
    }, {
        id: 10,
        player1: 'Dimitri',
        player2: 'Boguste',
    }]);
});

app.post('/pusher/auth', function(req, res) {
    var socketId = req.body.socket_id;
    var channel = req.body.channel_name;
    var auth = pusher.authenticate(socketId, channel);
    res.send(auth);
});

var port = process.env.PORT || 5000;
app.listen(port);