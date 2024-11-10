const express = require('express');
const app = express();

app.get('/', (request, response)=>{
    response.send('Hello Tejas Kulkarni!, I am node from route /');
});


const port = 3001;

app.listen(port, (error)=>{
    if(error){
        console.log(error);
    }else{
        console.log('Port started on ', port);
    }
});
