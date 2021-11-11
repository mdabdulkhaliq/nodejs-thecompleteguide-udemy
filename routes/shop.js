const express = require('express');
const router = express.Router();
const path = require('path');

const rootDir = require('../util/path');

const adminData = require('./admin');

router.get('/',(req,res,next) => {
    console.log('from shop.js', adminData.products);
    //res.send('<h2>You are in / route</h2>');
    //res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'))
    //res.sendFile(path.join(rootDir, 'views', 'shop.html'))
    //After we specify the view engine as pug and the view folder as views, we can use the render method to return the pug template file in the response which contains the dynamic html template.
    const products = adminData.products;
    res.render('shop', {prods: products, title: 'My Shop'});
});

module.exports = router;