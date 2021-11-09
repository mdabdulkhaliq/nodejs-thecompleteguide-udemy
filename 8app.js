const express = require('express');
const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes =  require('./routes/shop');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

//The order of the routes will not matter as long as we are using specific http methods as it uses exact path match but if we use router.use then the order of the routes will matter because router.use('/',...) will handle all http method requests to / pattern
//If all admin routes start with /admin then it can be filtered out here instead of specifying them in the admin file explicitly for all routes
app.use('/admin',adminRoutes);
app.use(shopRoutes);

//generic method to handle 404
//we can chain all response method like setHeader, status, send etc as below
app.use((req, res, next) => {
    res.status(404).send('<h2>Page not found!</h2>');
});

app.listen(3000);
