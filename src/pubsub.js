;(function() {
    'use strict';

    var handlers = {};

    var pubsub = {

        publish: function(event) {
            for (var key in handlers) {
                if (event.match(new RegExp(key + '(?=$|:)'))) {
                    for (var i = 0, l = handlers[key].length; i < l; i++) {
                        handlers[key][i].apply(window, arguments);
                    }
                }
            }
        },

        subscribe: function(event, handler) {
            handlers[event] = handlers[event] || [];
            handlers[event].push(handler);
        },

        unsubscribe: function(event, handler) {
            for (var key in handlers) {
                if (handlers[key]) {
                    for (var i = 0, l = handlers[key].length; i < l; i++) {
                        if (handlers[key][i] === handler) {
                            handlers[key].splice(i, 1);
                        }
                    }
                }
            }
        }
    };

    if (typeof define === 'function' && define.amd) {
        define(function() {
            return pubsub;
        });
    } else if (typeof module === 'object' && module.exports) {
        module.exports = pubsub;
    } else {
        window.PubSub = pubsub;
    }
}());