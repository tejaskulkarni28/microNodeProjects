const http = require('http');
const port = 3001;

const server = http.createServer(function(request, response){
    response.end('Hello Tejas! I am  NodeJs Server! on Port ', port)
});

server.listen(port, ()=>{
    if(server.listening){
        console.log('Server is listening on port ', port);
    }else{
        console.log('Server is NOT listening on port ', port);
    }
});
