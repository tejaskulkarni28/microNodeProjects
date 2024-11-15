const EventEmitter = require('events');

// creating an instance of class EventEmitter
const uploader = new EventEmitter();


// on method which takes the event emitter name as a first parameter
// and also takes a function with an argument to pass further and execute
uploader.on('uploading', (percentage)=>{
        console.log(`Uploading the file: ${percentage}`)
});


let percentage = 20; // initial state
// emit the event in the recursive form
const uploadFile = setInterval(()=>{

        percentage += 20;

        uploader.emit('uploading', percentage);

        if(percentage >= 100){
                console.log('Upload successfully completed')
                clearInterval(uploadFile);
        }
}, 1000)
