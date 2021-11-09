const express = require('express');
const router = express.Router();

const path = require('path');
const rootDir = require('../util/path');

//router.use will behave same as app.use
//router.get router.post and all other methods work same as app.get app.post i.e it will do exact path match

//if all the admin endpoints start with /admin instead of repeating it here we can move it to the starting file in app.js

//Add product get method => /admin/add-product - GET
router.get('/add-product',(req,res,next) => {
    // res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"/><input type="submit" /></form>');
    // we can also send a file as a response. we need to specify an absolute path and not a relative path
    // since this admin.js file will be imported in app.js the path to views folder will be /views/add-product.html
    // when we run this the application will look for the absolute path on the server where this is running/deployed so /views/add-product.html will not be found
    // to resolve this we use the core path library __dirname will give the current path
    // since __dirname is current file directory, we need to form the path from the current file
    //res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

//Add product post method => /admin/add-product - POST
router.post('/add-product',(req,res,next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;