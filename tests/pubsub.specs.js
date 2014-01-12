describe('PubSub', function() {
    "use strict";

    var eventName, otherEventName;

    beforeEach(function() {
        eventName = Math.random().toString();
        otherEventName = Math.random().toString();
    });

    describe('When subscribing', function() {

        it('should work correctly', function() {
            var eventData = { x: 1, y: 2 };
            var spy = jasmine.createSpy('event handler function').andCallFake(function() {
                expect(this.event).toEqual(eventName);
                expect(this.args).toEqual([eventData]);
            });

            // subscribing to the event among some dummy functions
            PubSub.subscribe('dummy', function() {});
            PubSub.subscribe('dummy2', function() {});
            PubSub.subscribe(eventName, function() {});
            PubSub.subscribe(eventName, spy);
            PubSub.subscribe(eventName, function() {});

            PubSub.publish(eventName, eventData);
            PubSub.publish(eventName, eventData);

            expect(spy).toHaveBeenCalled();
            expect(spy.callCount).toEqual(2);
        });

        it('should set the correct context for the event callback', function() {
            var a = Math.random(), b = 'sadfsdsdf', c = Math.random() + 'asdfsdf';

            var fn = function() {
                expect(this.event).toEqual(eventName);
                expect(this.args).toEqual([a, b, c]);
            };

            PubSub.subscribe(eventName, fn);
            PubSub.publish(eventName, a, b, c);
        });
    });

    describe('When unsubscribing', function() {
        it('should unsubscribe function from events', function() {
            var spy = jasmine.createSpy();

            PubSub.subscribe(eventName, spy);
            PubSub.unsubscribe(eventName, spy);
            PubSub.publish(eventName);

            expect(spy).not.toHaveBeenCalled();
        });

        it('should not unsubscribe other functions', function() {
            var spy = jasmine.createSpy();
            var spy2 = jasmine.createSpy();

            PubSub.subscribe(eventName, spy);
            PubSub.subscribe(eventName, spy2);
            PubSub.unsubscribe(eventName, spy);
            PubSub.publish(eventName);

            expect(spy).not.toHaveBeenCalled();
            expect(spy2).toHaveBeenCalled();
        });
    });

    describe('When unsubscribing without event name', function() {

        it('should unsubscribe all occurrences of the function', function() {
            var spy = jasmine.createSpy();
            PubSub.subscribe(eventName, spy);
            PubSub.subscribe(otherEventName, spy);

            PubSub.unsubscribe(spy);

            PubSub.publish(eventName);
            PubSub.publish(otherEventName);

            expect(spy).not.toHaveBeenCalled();
        });
    });

    describe('When accessing PubSub methods', function() {
        it('short aliases should also be defined', function() {
            expect(PubSub.pub).toBe(PubSub.publish);
            expect(PubSub.sub).toBe(PubSub.subscribe);
            expect(PubSub.unsub).toBe(PubSub.unsubscribe);
        });
    });

});