var express = require('express');
var router = express.Router();
var Book = require('../models/book')
var csrf = require('csurf');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/', function(req, res, next) {
  Book.find(function (err, docs) {
    var bookChunks = [];
    var chunkSize = 2;
    for(var i=0; i < docs.length; i+=chunkSize){
      bookChunks.push(docs.slice(i, i+chunkSize));
    }
    res.render('shop/index', { title: 'Book Store', books: bookChunks });
  });
});

router.get('/user/signup',function(req, res, next) {
    res.render('user/signup', {csrfToken: req.csrfToken()});
});

router.post('/user/signup', function (req, res, next) {
    res.redirect('/');
});
module.exports = router;
