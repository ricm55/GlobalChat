const express = require('express');
const router = express.Router();


/* home page */
router.get('/', function(req, res) {
    console.log('se rendre a lindex');
    res.render('index');
});

/* error */
router.get('/*', function(req, res) {
    console.log(req.protocol + '://' + req.get('host') + req.originalUrl);
    console.log(req.originalUrl);
    res.render('error');
});

module.exports = router;
