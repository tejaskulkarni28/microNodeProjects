const http = require('http');
const fs = require('fs')
const port = 3001;
const url = require('url');
const server  = http.createServer(function(request, response){
    if(request.url != '/favicon.ico'){
        const log = `${Date.now()} Request received on port ${port} and route ${request.url}\n`;
        const parsedURL = url.parse(request.url, true)
        const fullname = `${parsedURL.query.fname} ${parsedURL.query.lname}`
        fs.appendFile('logfile.txt', log, null, (error)=>{
            console.log('Error: ', error)
        })
        switch(parsedURL.pathname){
            case '/':
                response.end(`Home route: Hello ${fullname}`)
                break;
            case '/about':
                response.end(`About route: Hello ${fullname}`)
                break;
            default:
                response.end('Unknown route')
        }
    }
});
server.listen(port, ()=>{
    if(server.listening){
        console.log('Server is listening on port ', port);
    }else{
        console.log('Server is NOT listening on port ', port);
    }
});
