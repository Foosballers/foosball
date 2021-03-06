var express = require('express'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    vault = require('./foosballVault'),
    PusherServer = require('pusher'),
    PusherClient = require('pusher-client'),
    vault = require('./foosballVault');

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

app.get('/players/standings', function (req, res) {
    vault.getView('page', 'payload', {group: true}, function (err, body) {
        if (err)
            return console.log('[view.page.payload]', err)

        res.send(body.rows.map(function (row) {
            return {player: row.key, wins: row.value.wins, losses: row.value.losses}
        }));
    });
});

app.get('/players', function (req, res) {
    vault.getView('page', 'players', null, function (err, body) {
        if (err)
            return console.log('[view.page.payload]', err)

        res.send(body.rows.map(function (row) {
            return row.id
        }));
    });
});

app.get('/games/recent', function (req, res) {
    limitn = req.query.limit || 5;
    vault.getView('games', 'ended', {descending:true, limit:limitn, include_docs:true}, function (err, body) {
        if (err)
            return console.log('[view.games.ended]', err)

        res.send(body.rows.map(function (row) {
            return row.doc
        }));
    });
});

app.get('/games/queue', function (req, res) {
    limitn = req.param.limit || 5;
    vault.getView('games', 'queued', {limit:limitn,include_docs:true}, function(err, body){
        if(err) {
            console.log('games-queue load:', err);
            return err;
        }
        res.send(body.rows.map(function(row){
            return row.doc;
        }));

    });
});

app.get('/goals/:gameId', function (req, res) {
   vault.getView('goals', 'gameids', {key: req.params.gameId, include_docs: true}, function (err, body) {
      if(err) {
         console.error('[goals.gameids] failed: ', err);
         return err;
      }
      res.send(body.rows.map(function(row) {
         return row.doc;
      }));
   });
});

app.post('/pusher/auth', function (req, res) {
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
        on_receive: function(data){ console.info(data); vault.storeGoal(data); }
    }, {
        name: 'client-game:queued',
        on_receive: function(data){ console.info(data); vault.storeGameQueued(data); }
    }]

for (var i = 0, len = game_events.length; i < len; i++) {
    (function(idx) {
        var eventable = game_events[idx]
        p_chan.bind(eventable.name, function(data) {
            console.info('recevied: %s', eventable.name)
            eventable.on_receive(data)
        })
    })(i)
}

app.listen(config.port, function () {
    console.log('listening on *: ', config.port);
});
