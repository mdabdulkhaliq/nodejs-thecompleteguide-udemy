const express = require('express');
const router = express.Router();

//router.use will behave same as app.use
//router.get router.post and all other methods work same as app.get app.post i.e it will do exact path match

//if all the admin endpoints start with /admin instead of repeating it here we can move it to the starting file in app.js

//Add product get method => /admin/add-product - GET
router.get('/add-product',(req,res,next) => {
    res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"/><input type="submit" /></form>');
});

//Add product post method => /admin/add-product - POST
router.post('/add-product',(req,res,next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;