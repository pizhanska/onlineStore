var express = require('express');
var router = express.Router();

var Cart = require('../models/cart');
var Book = require('../models/book');

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
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Book.findById(bookId, function (err, book) {
       if(err){
           return res.redirect('/');
       }
       cart.add(book, book.id);
       req.session.cart = cart;
       console.log(req.session.cart);
       res.redirect('/');
    });
});

router.get('/shopping-cart', function (req, res, next) {
    if(!req.session.cart){
        return res.render('shop/shopping-cart', {books:null});
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart', {books: cart.generateArray(), totalPrice: cart.totalPrice})

});

module.exports = router;
