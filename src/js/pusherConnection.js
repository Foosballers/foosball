var pusher = new Pusher('76abfc1ad02da9810a9d');
var channel = pusher.subscribe('private-foosball_channel');

module.exports = {
    subscribe: function (event, callback) {
        channel.bind(event, callback);
    },
    publish: function(eventName, data){
        channel.trigger('client-' + eventName, data);
    }
};
