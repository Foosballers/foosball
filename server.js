var express = require('express'),
    bodyParser = require('body-parser'),
    Cloudant = require('Cloudant'),
    Pusher = require('pusher');

var me = 'thedreadpirate';
var password = 'passw0rd';

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

app.get('/players/standings', function (req, res) {
    Cloudant({account: me, password: password}, function (er, cloudant) {
        if (er)
            return console.log('Error connecting to Cloudant account %s: %s', me, er.message)

        var foosball = cloudant.use('foosball');
        // and insert a document in it
        foosball.view('page', 'payload', function (err, body) {
            if (err)
                return console.log('[alice.insert] ', err.message)

            res.send(body);
        });
    });
});

app.get('/games/recent', function (req, res) {
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

app.get('/games/queue', function (req, res) {
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

app.post('/pusher/auth', function (req, res) {
    var socketId = req.body.socket_id;
    var channel = req.body.channel_name;
    var auth = pusher.authenticate(socketId, channel);
    res.send(auth);
});

var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log('listening on *: ', port);
});