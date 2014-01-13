;(function() {
    'use strict';

    function checkEvent(event) {
        if (Object.prototype.toString.call(event) !== '[object String]') {
            throw new TypeError('Event is not a string.');
        }
    }

    function checkHandler(handler) {
        if (typeof handler !== 'function') {
            throw new TypeError('Handler is not a function');
        }
    }

    var handlers = {};
    var pubsub = { };

    pubsub.publish = pubsub.pub = function(event) {

        checkEvent(event);

        if (!handlers[event]) {
            return;
        }

        var ctx = { event: event, args: Array.prototype.slice.call(arguments, 1) };

        for (var i = 0, l = handlers[event].length; i < l; i++) {
            handlers[event][i].apply(ctx, ctx.args);
        }
    };

    pubsub.subscribe = pubsub.sub = function(event, handler) {
        checkEvent(event);
        checkHandler(handler);
        (handlers[event] = handlers[event] || []).push(handler);
    };

    pubsub.unsubscribe = pubsub.unsub = function() {
        var args = Array.prototype.slice.call(arguments),
            event, handler, i, l;

        if (args.length >= 2) {
            event = args[0];
            handler = args[1];

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
            handler = args[0];

            checkHandler(handler);

            for (event in handlers) {
                for (i = 0, l = handlers[event].length; i < l; i++) {
                    if (handlers[event][i] === handler) {
                        handlers[event].splice(i, 1);
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