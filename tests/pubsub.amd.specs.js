define(['../src/pubsub'], function(PubSub) {
    "use strict";

    describe('When using AMD', function() {
        it('should register the PubSub module', function() {

            expect(PubSub).toBeDefined();

            expect(PubSub.publish).toBeDefined();

            expect(PubSub.subscribe).toBeDefined();

            expect(PubSub.unsubscribe).toBeDefined();

        });
    });
});
