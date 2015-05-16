var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config')
var vault = require('./gameVault')

var PusherServer = require('pusher');
var PusherClient = require('pusher-client')

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: false
}));

var pusher_server = new PusherServer({
    appId: config.pusher.app_id,
    key: config.pusher.key,
    secret: config.pusher.secret
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
    var auth = pusher_server.authenticate(socketId, channel);
    res.send(auth);
});

var p_sock = new PusherClient(config.pusher.key, {
    secret: config.pusher.secret,
    channel_data: {
        user_id: 'foosballer-server',
        user_info: {
            name: 'server'
        }
    }
});

var p_chan = p_sock.subscribe(config.pusher.channel)

var game_events = [{
        name: 'client-game:started',
        on_receive: function(data){ console.info(data); vault.storeGameStarted(data); }
    }, {
        name: 'client-game:ended',
        on_receive: function(data){ console.info(data); vault.storeGameEnded(data); }
    }, {
        name: 'client-game:goalscored',
        on_receive: function(data){ console.info(data) }
    }, {
        name: 'client-game:queued',
        on_receive: function(data){ console.info(data) }
    }]

/* -- keith why this no work objs 0-2 are being smashed by last (3)
for (var idx = 0, len = game_events.length; idx < len; idx++) {
    var eventable = game_events[idx]
    p_chan.bind(eventable.name, function(data) {
        console.info('recevied: %s', eventable.name)
        eventable.on_receive(data)
    })
}
*/
p_chan.bind(game_events[0].name, game_events[0].on_receive)
p_chan.bind(game_events[1].name, game_events[1].on_receive)
p_chan.bind(game_events[2].name, game_events[2].on_receive)
p_chan.bind(game_events[3].name, game_events[3].on_receive)

console.info('server started on port %d', config.port)
app.listen(config.port);
