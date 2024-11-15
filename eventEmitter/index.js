// EventEmitter is a built-in module which helps us to create and manage custom events in the application
const EventEmitter = require('node:events');
const server = new EventEmitter();
server.on('eventFirst', (message)=>{
        console.log(`Here is the message: ${message}`);
})
server.emit('eventFirst', 'This is an event emitter');

// adding a customer property to the function

function greet(){
        console.log('Hello!');
}
greet.language = "English";
console.log(greet.language);