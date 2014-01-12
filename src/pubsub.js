;(function() {
    'use strict';

    function isString(obj) {
        return Object.prototype.toString.call(obj) === '[object String]';
    }

    function checkEvent(event) {
        if (!event || !isString(event)) {
            throw new TypeError('Event must be a string.');
        }
    }

    function checkHandler(handler) {
        if (typeof handler !== 'function') {
            throw new TypeError('Handler is not a function');
        }
    }

    var handlers = {};

    var pubsub = {
        publish: function(event) {

            if (!event || !isString(event)) {
                throw new TypeError('Event must be a string.');
            }

            if (!handlers[event]) {
                return;
            }

            var data = Array.prototype.slice.call(arguments, 1);
            var ctx = { event: event, args: data };

            for (var i = 0, l = handlers[event].length; i < l; i++) {
                handlers[event][i].apply(ctx, data);
            }
        },

        subscribe: function(event, handler) {
            checkEvent(event);
            checkHandler(handler);

            handlers[event] = handlers[event] || [];
            handlers[event].push(handler);
        },

        unsubscribe: function() {
            var event, handler, i, l;

            if (arguments.length >= 2) {
                event = arguments[0];
                handler = arguments[1];

                checkEvent(event);
                checkHandler(handler);

                if (!handlers[event]) {
                    return;
                }

                for (i = 0, l = handlers[event].length; i < l; i++) {
                    if (handlers[event][i] === handler) {
                        handlers[event].splice(i, 1);
                    }
                }
            } else {
                handler = arguments[0];

                checkHandler(handler);

                for (event in handlers) {
                    for (i = 0, l = handlers[event].length; i < l; i++) {
                        if (handlers[event][i] === handler) {
                            handlers[event].splice(i, 1);
                        }
                    }
                }
            }
        }
    };

    // Setting aliases
    pubsub.pub = pubsub.publish;
    pubsub.sub = pubsub.subscribe;
    pubsub.unsub = pubsub.unsubscribe;


    /*
    var pubsub = {

        publish: function(event) {
            var data = Array.prototype.slice.call(arguments, 1);

            var ctx = {
                event: event,
                args: data
            };

            for (var key in handlers) {
                if (event.match(new RegExp(key + '(?=$|:)'))) {
                    for (var i = 0, l = handlers[key].length; i < l; i++) {
                        handlers[key][i].apply(ctx, data);
                    }
                }
            }
        },

        subscribe: function(event, handler) {
            handlers[event] = handlers[event] || [];
            handlers[event].push(handler);
        },

        unsubscribe: function() {
            var event, handler;

            if (arguments.length >= 2) {
                event = arguments[0];
                handler = arguments[1];
            } else if (arguments.length === 1) {
                handler = arguments[0];
            } else {
                throw 'Nothing function to subscribe.';
            }

            for (var key in handlers) {
                if (!event || event.match(new RegExp(key + '(?=$|:)'))) {
                    if (handlers[key]) {
                        for (var i = 0, l = handlers[key].length; i < l; i++) {
                            if (handlers[key][i] === handler) {
                                handlers[key].splice(i, 1);
                            }
                        }
                    }
                }
            }
        }
    };*/

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