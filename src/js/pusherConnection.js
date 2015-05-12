var pusher = new Pusher('76abfc1ad02da9810a9d');
console.log('creating pusher');
var channel = pusher.subscribe('foosball_channel');

module.exports = {
    subscribe: function (event, callback) {
        channel.bind(event, callback);
    }
};
