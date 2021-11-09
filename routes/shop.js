const express = require('express');
const router = express.Router();
const path = require('path');

const rootDir = require('../util/path');

router.get('/',(req,res,next) => {
    //res.send('<h2>You are in / route</h2>');
    //res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'))
    res.sendFile(path.join(rootDir, 'views', 'shop.html'))
});

module.exports = router;