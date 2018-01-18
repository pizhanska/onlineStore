var express = require('express');
var router = express.Router();

var Book = require('../models/book')

router.get('/', function (req, res, next) {
    Book.find(function (err, docs) {
        var bookChunks = [];
        var chunkSize = 2;
        for (var i = 0; i < docs.length; i += chunkSize) {
            bookChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('shop/index', {title: 'Book Store', books: bookChunks});
    });
});

router.get('/add-to-cart/:id', function (req, res, next) {
    var bookId = req.params.id;
    
});

module.exports = router;
