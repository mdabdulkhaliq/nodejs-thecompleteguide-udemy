//http is a global core module used to create server and send or receive requests.
//to import a local file we need to specify the path ./ or ../tofile
const http = require('http');
const fs = require('fs');

//Method 1
//function requestListener(request, response){
//}
//http.createServer(requestListener);

//Method 2
//http.createServer(function(request, response){
//});

//Method 3
/*const server = http.createServer((req,res) => {
    //console.log(req);
    //console.log(req.url, req.method, req.headers);
    //process.exit();
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head>');
    res.write('<title>My Node application</title>');
    res.write('<body><h3>Hello from my node server!</h3></body>');
    res.write('</head>');
    res.write('</html>');
    res.end(); // will send the response back to the server.
    //res.write('<h1>Hello</h1>') //will return an error (Error [ERR_STREAM_WRITE_AFTER_END]: write after end) as response has already been sent using end method.
});
*/

const server = http.createServer((req,res) => {
    const url = req.url; //Get the url from the request
    const method = req.method; //Get the http method from the request

    if(url === '/'){
        res.write('<html>');
        res.write('<head>');
        res.write('<title>My Node application</title>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"/><input type="submit" value="submit"></button></form></body>');
        res.write('</head>');
        res.write('</html>');
        return res.end(); //need to return if not it will execute any code if present below the if block and if it has res.write it will give error.
    }

    /*if(url === '/message' && method === 'POST'){
        fs.writeFileSync('message.txt','some text'); //create a file and write text
        res.statusCode = 302; //set response http status code
        res.setHeader('Location','/'); //set header to redirect to location
        return res.end();
    }*/

    if(url === '/message' && method === 'POST'){
        const body = []; //array to stores the chunks of data from the input stream
        //Event listener to listen to incoming chunks of data from the input stream and its callback is registered and node proceeds further asynchronously executing other code below this 
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });

        //Event listener when the request ends is registered with the callback
        return req.on('end', () => {
            //Add all the chunks of data using Buffer Class available globally provided by node
            const parsedBody = Buffer.concat(body).toString();
            //Body contains key value pairs
            console.log(parsedBody);
            //Retrieve the value
            const message = parsedBody.split("=")[1];
            //This line is moved inside the event listener to make sure message written only after it is received completely.
            //Synchronous way of writing the file
            //fs.writeFileSync('message.txt',message); //create a file and write text
            //res.statusCode = 302; //set response http status code
            //res.setHeader('Location','/'); //set header to redirect to location
            //return res.end();

            //Async way of writing the file
            fs.writeFile('message.txt',message, (error) => {
                res.statusCode = 302; //set response http status code
                res.setHeader('Location','/'); //set header to redirect to location
                return res.end();
            });
            
        });

        //the below three lines should be placed above in the on end event callback if response should not be sent until file write operation is completed. But in this case the response will be sent to the client using the general code after the event which also returns reponse. And when the event call back is executed when it retries to set the headers it will give error Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client. so we need to be aware of the execution logic of the async code callbacks. to avoid the issue we add return to the event listener so that execution does not come to the general block of code below it.
        //res.statusCode = 302; //set response http status code
        //res.setHeader('Location','/'); //set header to redirect to location
        //return res.end();
    }

    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>My application header</title></head>');
    res.write('<body><h2>Hello...</h2></body>')
    res.write('</html>');
    res.end();
});


//The server will continue to listen indefinitely as we have registered an event for createServer and have not unregistered it. If we want to exit we use process.exit()
server.listen(3000);
