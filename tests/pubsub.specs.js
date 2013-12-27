describe('PubSub', function() {
    "use strict";

    var eventName = 'test';

    describe('When subscribing before publishing', function() {

        it('should fire the events', function() {
            var fired = 0;
            var firedEventName;
            var firedEventData;

            PubSub.subscribe(eventName, function(eventName, eventData) {
                fired++;
                firedEventName = eventName;
                firedEventData = eventData;
            });

            PubSub.publish(eventName, { x: 1 });

            expect(fired).toEqual(1);
            expect(firedEventName).toEqual(eventName);
            expect(firedEventData).toBeDefined();
            expect(firedEventData.x).toEqual(1);

            PubSub.publish(eventName);
            PubSub.publish(eventName);

            expect(fired).toEqual(3);
        });
    });

    describe('When publishing before subscribing', function() {

        it('should not fire any event', function() {
            var fired = 0;

            PubSub.publish(eventName);
            PubSub.publish(eventName);

            PubSub.subscribe(eventName, function() {
                fired++;
            });

            expect(fired).toEqual(0);
        });
    });

    describe('When unsubscribing', function() {
        it('should not fire the event anymore', function() {
            var fired = 0;

            var fn = function() {
                fired++;
            };

            PubSub.subscribe(eventName, fn);
            PubSub.publish(eventName);

            expect(fired).toEqual(1);

            PubSub.unsubscribe(eventName, fn);
            PubSub.publish(eventName);

            expect(fired).toEqual(1);
        });
    });

    describe('When using namespaces in event names', function() {
        it('should also fire for event names which are more specific', function() {

            var fired = 0;

            var fn = function() {
                fired++;
            };

            PubSub.subscribe('A:B', fn);
            PubSub.publish('A:B');
            PubSub.publish('A:B:C');

            expect(fired).toEqual(2);
        });

        it('should not fire for event names which are less specific', function() {
            var fired = 0;

            var fn = function() {
                fired++;
            };

            PubSub.subscribe('A:B', fn);
            PubSub.publish('A');
            PubSub.publish('A:B');

            expect(fired).toEqual(1);
        });
    });
});