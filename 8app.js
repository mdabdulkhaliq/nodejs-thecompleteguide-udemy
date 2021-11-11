const path = require('path');
const express = require('express');
const app = express();

//After we installed pug which has integration with express and auto registers with express framework, we can tell express that we want to use pug as the view engine.
app.set('view engine', 'pug');
//the default directory in which the pug view documents are available is process.cwd + /views, we specified the same below anyway, if it was any other directory than views we can specify it.
app.set('views' , 'views');

const adminData = require('./routes/admin');
const shopRoutes =  require('./routes/shop');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

//When a client tries to access the filesystem the express will use app.js to search for a request path and process but does not consider it as filesystem request.
//If we want to access css, js, images etc on the server filesystem, we can tell express to consider certain folders on the server to be used as file system requests and not as api requests.
//this will make all files in the public folder to be served as files and not interpet by express as api requests
//this middleware is placed at the beginning where express checks if any of the incoming url requests matches with the path of any file in the static folder then it serves it.
app.use(express.static(path.join(__dirname, "public")));

//The order of the routes will not matter as long as we are using specific http methods as it uses exact path match but if we use router.use then the order of the routes will matter because router.use('/',...) will handle all http method requests to / pattern
//If all admin routes start with /admin then it can be filtered out here instead of specifying them in the admin file explicitly for all routes
app.use('/admin',adminData.routes);
app.use(shopRoutes);

//generic method to handle 404
//we can chain all response method like setHeader, status, send etc as below
app.use((req, res, next) => {
    //res.status(404).send('<h2>Page not found!</h2>');
    //res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404');
});

app.listen(3000);
