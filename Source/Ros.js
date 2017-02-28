var ROSLIB = require('ROSLIB')

var ros = {
    handlers: [],
    setup: function() {

        var ros = new ROSLIB.Ros({
            url: 'ws://192.168.0.21:9090'
        });

        ros.on('connection', function() {
            console.log('Connected to ros.');
        });

        ros.on('error', function(error) {
            console.log('Error connecting to ros: ', error);
        });

        ros.on('close', function() {
            console.log('Connection to ros closed.');
        });

        var listener = new ROSLIB.Topic({
            ros: ros,
            name: "/uav_position",
            messageType: "uavsim/Position"
        })

        listener.subscribe((message) => {
            this.handlers.forEach((h) => {
                h(message)
            })
        })
    },

    addHandler: function(myFunc) {
        this.handlers.push(myFunc)
    },

    removeHandler: function(myFunc) {
        var index = this.handlers.indexOf(myFunc)
        if (index !== -1) {
            this.handlers.splice(index, 1)
        }
    }
}

module.exports = ros