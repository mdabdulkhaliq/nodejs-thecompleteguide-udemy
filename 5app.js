//import core modules
//const http = require('http');

//import external modules
const express = require('express');

//Express is a routing and middleware web framework that has minimal functionality of its own: An Express application is essentially a series of middleware function calls. ... Middleware functions can perform the following tasks: Execute any code. Make changes to the request and the response objects.

//Create an express app by calling the express function. 
const app = express();

//app.use allows us to add a new middleware function. 
//Accepts requests handlers with three parameters req, res and next.
//next is a function that should be called to process the request further by other middlewares.
//The middlewares are executed sequentially from top to bottom
//If there are no other middlewares then we need to return the response instead of calling next
//If we dont call next or return response then the request will be stuck in the server
//The middleware function will be executed for every incoming request.

/* app.use((req,res,next) => {
    console.log('In the middleware');
    next();
}); */


/* app.use((req,res,next) => {
    console.log('In another middleware');
    //call next or return response if not the request will be stuck
    //express adds a send function to return response. It sets default header as text/html
    //we can still use node's res.write and res.end if we want and we can overwrite the headers using res.setHeaders
    res.send('<h1>Hello from Express!</h1>');
}); */


//app.use had overloaded methods which can accept paths as well. / path will match all paths beginning with /. if we want to handle /add-product then we need to place it before / middleware function, since middlewares are executed sequentially.
app.use('/add-product',(req,res,next) => {
    res.send('<h2>You are in /add-product route</h2>');
});

app.use('/',(req,res,next) => {
    res.send('<h2>You are in / route</h2>');
});

//The express app is a request handler hence we can pass it to the create server function of the node.
//const server = http.createServer(app);

// server.listen(3000, () => {
//     console.log('Server is running on 3000...');
// });


//Express provides the below alternative to starting the server, used instead of line 2, 33 and 35-37
app.listen(3000);
