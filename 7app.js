const express = require('express');
const app = express();

//body-parser is a npm external library that is as a middleware function that will make the form data and other input data available in req.body parameter and then calls the next function to execute the request further. This should be the very first middleware function if we are using body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

//app.use is used to handle all HTTP method requests, we can restrict it based on HTTP method using app.get app.post app.put app.delete so on.
//so if we use app.get(/,...) then the / will not handle all requests but will handle only get requests to / so that order will not matter if we use get post put delete patch etc but if we use app.use then the order matters as the middleware function will be executed for all http methods for that url pattern.
app.use('/add-product',(req,res,next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"/><input type="submit" /></form>');
});

app.use('/product',(req,res,next) => {
    console.log(req.body);
    //res.redirect provided by express can be used in place of res.statusCode = 302; and res.setHeader('Location','/');
    res.redirect('/');
});

app.use('/',(req,res,next) => {
    res.send('<h2>You are in / route</h2>');
});

app.listen(3000);
