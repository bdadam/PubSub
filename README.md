PubSub
======

A simple, small (under 1kb minified) PubSub implementation in JavaScript. It is completely dependency-free and can be used as a RequireJS module.

##How to install
It you use bower, simply install the component with it:
```
bower install pubsub
```
and then include the script file in yout html:
```html
<script src="bower_components/pubsub/pubsub.min.js"></script>
```

Without bower just clone/download this repository and include the script file in your html:
```html
<script src="pubsub.min.js"></script>
```

##How to use it
###Without RequireJS
```javascript

window.PubSub.subscribe('test', function(a, b) {
  console.log(a); // 1
  console.log(b); // 2
  console.log(this.event); // "test"
  console.log(this.args); // [1, [2, 3, 4]]
});

window.PubSub.publish('test', 1, [2, 3, 4]);
```

###With RequireJS
```javascript
define(['pubsub'], function(PubSub) {
  PubSub.subscribe('test', function(a, b) {
    console.log(a); // 1
    console.log(b); // [2, 3, 4]
  });
});

define(['pubsub'], function(PubSub) {
  PubSub.publish('test', 1, [2, 3, 4]);
});
```

##API
The API is very simple.
```javascript
/* Subscribes a function to a specific event.
 * The function receives the event data object[s] as arguments.
 * The scope of the handler function contains event and args. {event: event, args: [data, ...]}
 * @param {string} event
 * @param {function} fn
 */
PubSub.subscribe(event, fn)

/* Publishes an event with the supplied message data object[s].
 * @param {string} event
 * @param {anything} data - any number of event data objects.
 */
PubSub.publish(event [, data, data, data...])

/* Unsubscribes an event handler from the specified event.
 * If event is missing, the handler will be unsubscribed from all subscribed events.
 * @param {string} event - optional
 * @param {function} handler
 */
PubSub.unsubscribe([event], handler)
```
There are also some shorter aliases for convenience
```javascript
PubSub.sub(event, fn)
PubSub.pub(event [, data, data, data...])
PubSub.unsub([event], handler)
```

##License
This code is licensed under the MIT license. If you like it, please drop a line.
