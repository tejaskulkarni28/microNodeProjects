// EventEmitter is a built-in module which helps us to create and manage custom events in the application
//
// So you have th events waiting in the event-queue.
// Event loop picks the events smartly for example there are two types of events
//  1) Blocking Event Operation
//  2) Non-Blocking Event Operation
//
//  For Blocking(Synchronous operation) it is send to the thread pool which have maximum 4 threads. But you can have the cpu threads as an extra threads
//  For Non-Blocking(Asynchronous operation) it is resloved at the event-loop itself and send as a response back to the client.
//
//
//  // Here comes the EventEmitter which is a built-in module which provides us to create, and manage the events as per the requirement.
//
//

const EventEmitter = require('node:events');
const eventEmitter = new EventEmitter();

eventEmitter.on('test', (args)=>{
        console.log(args)
})

eventEmitter.emit('test', 'SayHello')