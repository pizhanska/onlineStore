var express = require('express');
var router = express.Router();

var Cart = require('../models/cart');
var Book = require('../models/book');
var Order = require('../models/order');

router.get('/', function (req, res, next) {
    var successMsg = req.flash('success')[0];
    Book.find(function (err, docs) {
        var bookChunks = [];
        var chunkSize = 2;
        for (var i = 0; i < docs.length; i += chunkSize) {
            bookChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('shop/index', {title: 'Book Store', books: bookChunks, successMsg: successMsg, noMessages: !successMsg});
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

router.get('/checkout', function (req, res, next) {
    if(! req.session.cart){
        return res.redirect('shop/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    res.render('shop/checkout', {total:cart.totalPrice, errMsg: errMsg, noError:!errMsg});
});

router.post('/checkout', function (req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);

    var stripe = require("stripe")(
        "sk_test_hFCaepjzyjI7FzUOTTLhW6XA"
    );

    stripe.charges.create({
        amount: cart.totalPrice * 100,
        currency: "usd",
        source: req.body.stripeToken, // obtained with Stripe.js
        description: "Test Charge"
    }, function(err, charge) {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/checkout');
        }
        var order = new Order({
            user: req.user,
            cart: cart,
            address: req.body.address,
            name: req.body.name,
            paymentId: charge.id
        });
        order.save(function(err, result) {
            req.flash('success', 'Successfully bought product!');
            req.session.cart = null;
            res.redirect('/');
        });
    });
});
module.exports = router;
