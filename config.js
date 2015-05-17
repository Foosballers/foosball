config = {
    port: process.env.PORT || 5000,

    pusher: {
        channel: process.env.PUSHER_CHANNEL || 'private-foosball_channel',
        app_id: '119859',
        key: '76abfc1ad02da9810a9d',
        secret: '07c4c701b5d1c864459d',
    },

    couchdb: {
        uri: process.env.COUCHDB_URI || 'http://localhost:5984',
    }
};

module.exports = config;