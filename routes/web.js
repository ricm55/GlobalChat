const express = require('express');
const router = express.Router();


/* home page */
router.get('/', function(req, res) {
    res.render('index');
});

/* error */
router.get('/*', function(req, res) {
    res.render('error');
});

module.exports = router;